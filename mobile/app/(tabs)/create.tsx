import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/create.styles";
import { useRouter } from "expo-router";
import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/constants/api";

const Create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState<string | null>(null); // to display selected image
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();

  const pickImage = async () => {
    try {
      // request permission
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status != "granted") {
          Alert.alert(
            "Permission Denied",
            "We need camera roll persmissions to upload an image."
          );
          return;
        }
      }

      // launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        // if base64 is provided, use it
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          // convert to base64
          const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );

          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.log("Error picking image", error);
      Alert.alert(
        "Error",
        "There was a problem selecting your image. Please try again."
      );
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      if (image) {
        // get file extension from URI or default to jpeg
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const imageType = fileType
          ? `image/${fileType.toLowerCase()}`
          : "image/jpeg";

        const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

        const response = await fetch(`${API_URL}/books`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            caption,
            rating: rating.toString(),
            image: imageDataUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Something went wrong.");
        else
          Alert.alert("Success", "Your book recommendation has been posted!");

        // clear form
        setTitle("");
        setCaption("");
        setRating(3);
        setImage(null);
        setImageBase64(null);

        // redirect to home
        router.push("/");
      }
    } catch (error) {
      console.log("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 0; i <= 4; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Octicons
            name={i <= rating ? "star-fill" : "star"}
            size={24}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>Recommend a Book</Text>
            <Text style={styles.subtitle}>
              Let others discover your favorite reads
            </Text>
          </View>

          <View style={styles.form}>
            {/* book form */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter a book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>

            {/* image */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* caption */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            {/* submit */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <SimpleLineIcons
                    name="cloud-upload"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
