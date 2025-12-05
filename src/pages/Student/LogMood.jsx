import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "./Student.css";

const LogMood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    feelingDescription: "",
    subCategory: "",
    subCategoryId: null,
    category: "",
    categoryId: null,
    addNote: "",
    pleasantness: 4,
    impact: 4,
    emotion: "",
    calculatedEmotion: "",
    calculatedZone: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [moods, setMoods] = useState([]);
  const [loadingMoods, setLoadingMoods] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [subCategorySuggestions, setSubCategorySuggestions] = useState([]);
  const [showSubCategorySuggestions, setShowSubCategorySuggestions] =
    useState(false);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState(null);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [zones, setZones] = useState([]);
  const textareaRef = useRef(null);
  const suggestionsRef = useRef(null);
  const subCategoryInputRef = useRef(null);
  const subCategorySuggestionsRef = useRef(null);

  const SERVER_URL = `${API_BASE_URL}/moods`;
  const SUB_CATEGORY_URL = `${API_BASE_URL}/subcategories`;
  const CATEGORY_URL = `${API_BASE_URL}/categories`;
  const EMOTION_URL = `${API_BASE_URL}/emotions`;
  const ZONE_URL = `${API_BASE_URL}/zones`;

  // Fetch moods from API
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setLoadingMoods(true);
        const response = await axios.get(`${SERVER_URL}`, {
          params: {
            status: "true", // Only fetch active moods
          },
        });
        if (response.data) {
          setMoods(response.data);
        }
      } catch (err) {
        console.error("Error fetching moods:", err);
        // Fallback to empty array if API fails
        setMoods([]);
      } finally {
        setLoadingMoods(false);
      }
    };

    fetchMoods();
  }, []);

  // Fetch subcategories from API
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoadingSubCategories(true);
        const response = await axios.get(`${SUB_CATEGORY_URL}`);
        if (response.data) {
          // Filter only active subcategories
          const activeSubCategories = response.data.filter(
            (subCat) => subCat.status === true
          );
          setSubCategories(activeSubCategories);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setSubCategories([]);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, []);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${CATEGORY_URL}`);
        if (response.data) {
          const activeCategories = response.data.filter(
            (cat) => cat.status === true
          );
          setCategories(activeCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch emotions and zones for calculation
  useEffect(() => {
    const fetchEmotionsAndZones = async () => {
      try {
        const [emotionsRes, zonesRes] = await Promise.all([
          axios.get(`${EMOTION_URL}`),
          axios.get(`${ZONE_URL}`),
        ]);
        if (emotionsRes.data) {
          setEmotions(emotionsRes.data.filter((e) => e.status === true));
        }
        if (zonesRes.data) {
          setZones(zonesRes.data.filter((z) => z.status === true));
        }
      } catch (err) {
        console.error("Error fetching emotions/zones:", err);
      }
    };

    fetchEmotionsAndZones();
  }, []);

  // Comprehensive mood definitions (fallback if API fails)
  const moodDefinitions = [
    {
      mood: "Enraged",
      description:
        "Feeling extremely angry and out of control. It's like your anger has reached its highest point, and you can't calm down.",
    },
    {
      mood: "Furious",
      description:
        "Very, very angry. It's a stronger feeling than just being mad or annoyed, almost like an explosive emotion.",
    },
    {
      mood: "Fuming",
      description:
        "Showing strong anger, almost like smoke coming out of your ears. You're so upset that it's hard to stay calm.",
    },
    {
      mood: "Disgusted",
      description:
        "Feeling very upset or sickened by something. It's like you can't stand what's happening or what you're experiencing.",
    },
    {
      mood: "Frightened",
      description:
        "Feeling scared or afraid. It's when something makes you feel really uneasy and worried about what might happen.",
    },
    {
      mood: "Lonely",
      description:
        "Feeling sad because you're alone or disconnected from others. It's a deep sense of isolation where you miss having someone around.",
    },
    {
      mood: "Depressed",
      description:
        "Feeling very sad for a long time. It's a heavy sadness that seems to stick with you and makes everything seem dull.",
    },
    {
      mood: "Panicked",
      description:
        "Feeling sudden and intense fear or worry. It's when you're overwhelmed and find it hard to think clearly or stay calm.",
    },
    {
      mood: "Nervous",
      description:
        "Feeling worried or uneasy about something. It's like having butterflies in your stomach because you're anxious about what's coming up.",
    },
    {
      mood: "Frustrated",
      description:
        "Feeling upset because things aren't going as planned. It's a mix of annoyance and disappointment when you hit obstacles or problems.",
    },
    {
      mood: "Angry",
      description:
        "Feeling strong displeasure or annoyance. It's when something bothers you a lot and makes you feel upset.",
    },
    {
      mood: "Worried",
      description:
        "Feeling anxious or concerned about something that might happen. It's when you're preoccupied with thoughts of potential problems or issues.",
    },
    {
      mood: "Miserable",
      description:
        "Feeling extremely unhappy or uncomfortable. It's a deep sense of unhappiness that makes everything seem worse.",
    },
    {
      mood: "Discouraged",
      description:
        "Feeling disheartened or lacking confidence. It's like losing hope or motivation because things aren't going as you hoped.",
    },
    {
      mood: "Shocked",
      description:
        "Feeling surprised or disturbed by something unexpected. It's a sudden, intense reaction to something that catches you off guard.",
    },
    {
      mood: "Restless",
      description:
        "Feeling unable to relax or stay still. It's like having too much energy or worry, making it hard to find calm or comfort.",
    },
    {
      mood: "Irritated",
      description:
        "Feeling annoyed or bothered by something. It's a persistent sense of discomfort or frustration, even if it's not overwhelming.",
    },
    {
      mood: "Disappointed",
      description:
        "Feeling sad because something didn't turn out as expected. It's when reality falls short of what you hoped for or anticipated.",
    },
    {
      mood: "Concerned",
      description:
        "Feeling worried about something. It's a mild form of anxiety or care about a situation that's important to you.",
    },
    {
      mood: "Tired",
      description:
        "Feeling like you need rest or sleep. It's when your energy is low, and you might feel drained but not necessarily unhappy.",
    },
    {
      mood: "Exhausted",
      description:
        "Feeling extremely tired. It's a state of being so low on energy that you need a lot of rest to recover.",
    },
    {
      mood: "Hyper",
      description:
        "Feeling overly energetic and excited. It's like having too much energy to stay still and being really animated.",
    },
    {
      mood: "Lively",
      description:
        "Feeling full of energy and enthusiasm. It's a sense of being excited and active, bringing a lot of spirit to whatever you're doing.",
    },
    {
      mood: "Energized",
      description:
        "Feeling full of energy and ready to go. It's when you feel awake, active, and motivated to take on tasks.",
    },
    {
      mood: "Satisfied",
      description:
        "Feeling pleased with how things are going. It's a sense of contentment and happiness with what you've achieved or have.",
    },
    {
      mood: "Complacent",
      description:
        "Feeling satisfied but maybe a bit too comfortable. It's when you're okay with the way things are and not seeking change or improvement.",
    },
    {
      mood: "Bored",
      description:
        "Feeling uninterested or restless because nothing is happening. It's a sense of dullness and lack of engagement with what's around you.",
    },
    {
      mood: "Uneasy",
      description:
        "Feeling slightly worried or uncomfortable. It's a mild sense of discomfort or nervousness that makes you feel unsettled.",
    },
    {
      mood: "Surprised",
      description:
        "Feeling astonished or amazed by something unexpected. It's a reaction to something that catches you off guard in a surprising way.",
    },
    {
      mood: "Enthusiastic",
      description:
        "Feeling excited and eager about something. It's a high level of interest and energy about a topic or activity.",
    },
    {
      mood: "Cheerful",
      description:
        "Feeling happy and full of joy. It's a bright and positive mood that makes you feel good and spread positivity.",
    },
    {
      mood: "Optimistic",
      description:
        "Feeling hopeful about the future. It's a positive outlook where you believe things will get better, even if there are challenges.",
    },
    {
      mood: "Focused",
      description:
        "Feeling concentrated and attentive to a task. It's being deeply engaged and determined to achieve something, without distractions.",
    },
    {
      mood: "Thoughtful",
      description:
        "Feeling considerate and reflective. It's when you carefully think about others' feelings or ideas and act with care.",
    },
    {
      mood: "Relaxed",
      description:
        "Feeling calm and at ease. It's a state where you're free from stress and worry, and you feel comfortable and serene.",
    },
    {
      mood: "Inspired",
      description:
        "Feeling motivated and excited by something or someone. It's when you're driven to act or create because you've been deeply moved.",
    },
    {
      mood: "Motivated",
      description:
        "Feeling driven to take action or achieve goals. It's a strong desire to pursue your goals and work towards what you want.",
    },
    {
      mood: "Proud",
      description:
        "Feeling pleased with something you or someone else has done. It's a sense of accomplishment and self-worth that comes from achievement.",
    },
    {
      mood: "Joyful",
      description:
        "Feeling great happiness and delight. It's an intense feeling of pleasure and contentment that brightens your day.",
    },
    {
      mood: "Peaceful",
      description:
        "Feeling calm and free from worry. It's a state of tranquility and quiet where you feel relaxed and at ease.",
    },
    {
      mood: "Hopeful",
      description:
        "Feeling optimistic about the future. It's a positive belief that things will improve and that better days are ahead.",
    },
    {
      mood: "Comfortable",
      description:
        "Feeling relaxed and at ease. It's when you're in a state of physical or emotional well-being and feel content.",
    },
    {
      mood: "Exhilarated",
      description:
        "Feeling extremely happy and excited. It's an intense and thrilling sense of joy and energy.",
    },
    {
      mood: "Thrilled",
      description:
        "Feeling very excited and happy. It's a high level of joy and enthusiasm about something exciting.",
    },
    {
      mood: "Blissful",
      description:
        "Feeling perfect happiness and contentment. It's an overwhelming sense of joy and peace that feels just right.",
    },
    {
      mood: "Grateful",
      description:
        "Feeling thankful for something. It's recognizing and appreciating the good things in your life and feeling appreciative.",
    },
    {
      mood: "Touched",
      description:
        "Feeling emotionally moved or affected by something. It's a deep sense of appreciation or warmth that impacts you deeply.",
    },
    {
      mood: "Carefree",
      description:
        "Feeling relaxed and without worries. It's a state of lightheartedness where you don't have any major concerns.",
    },
    {
      mood: "Serene",
      description:
        "Feeling calm and peaceful. It's a deep sense of tranquility and stillness where you feel completely at ease.",
    },
    // Additional moods
    {
      mood: "Anxious",
      description:
        "Feeling worried or nervous about something uncertain. It's a sense of unease about what might happen.",
    },
    {
      mood: "Stressed",
      description:
        "Feeling overwhelmed by pressure or demands. It's when you have too much to handle and feel tense.",
    },
    {
      mood: "Overwhelmed",
      description:
        "Feeling like you have too much to deal with. It's when everything seems too much to handle at once.",
    },
    {
      mood: "Confused",
      description:
        "Feeling uncertain or unclear about something. It's when you don't understand what's happening or what to do.",
    },
    {
      mood: "Embarrassed",
      description:
        "Feeling self-conscious or ashamed about something. It's when you feel awkward or uncomfortable in a situation.",
    },
    {
      mood: "Guilty",
      description:
        "Feeling responsible for something wrong. It's a sense of regret or remorse about your actions or decisions.",
    },
    {
      mood: "Ashamed",
      description:
        "Feeling deeply embarrassed or humiliated. It's a strong sense of regret or dishonor about something you've done.",
    },
    {
      mood: "Jealous",
      description:
        "Feeling envious of someone else. It's when you want what someone else has or feel threatened by their success.",
    },
    {
      mood: "Resentful",
      description:
        "Feeling bitter or angry about something unfair. It's holding onto negative feelings about a past wrong.",
    },
    {
      mood: "Betrayed",
      description:
        "Feeling hurt by someone you trusted. It's when someone you cared about has let you down or broken your trust.",
    },
    {
      mood: "Hurt",
      description:
        "Feeling emotional pain or distress. It's when something or someone has caused you to feel wounded emotionally.",
    },
    {
      mood: "Vulnerable",
      description:
        "Feeling exposed or unprotected. It's when you feel open to being hurt or criticized.",
    },
    {
      mood: "Insecure",
      description:
        "Feeling uncertain about yourself or your abilities. It's a lack of confidence or self-doubt.",
    },
    {
      mood: "Inadequate",
      description:
        "Feeling like you're not good enough. It's a sense that you don't measure up to what's expected or needed.",
    },
    {
      mood: "Hopeless",
      description:
        "Feeling like there's no way things will get better. It's a deep sense of despair and lack of optimism.",
    },
    {
      mood: "Helpless",
      description:
        "Feeling unable to change or control a situation. It's when you feel powerless to make things better.",
    },
    {
      mood: "Numb",
      description:
        "Feeling emotionally disconnected or empty. It's when you can't feel emotions strongly, often as a defense mechanism.",
    },
    {
      mood: "Empty",
      description:
        "Feeling like something is missing inside. It's a sense of void or lack of meaning or purpose.",
    },
    {
      mood: "Melancholic",
      description:
        "Feeling a deep, thoughtful sadness. It's a pensive sadness that's often reflective and contemplative.",
    },
    {
      mood: "Grief-stricken",
      description:
        "Feeling intense sorrow, especially from loss. It's deep sadness and mourning over something or someone lost.",
    },
    {
      mood: "Content",
      description:
        "Feeling satisfied and at peace. It's a sense of happiness and fulfillment with your current situation.",
    },
    {
      mood: "Calm",
      description:
        "Feeling peaceful and relaxed. It's a state of tranquility without stress or worry.",
    },
    {
      mood: "Tranquil",
      description:
        "Feeling calm and peaceful. It's a deep sense of quiet and serenity.",
    },
    {
      mood: "Centered",
      description:
        "Feeling balanced and grounded. It's a sense of being in control and at peace with yourself.",
    },
    {
      mood: "Balanced",
      description:
        "Feeling stable and in harmony. It's when different aspects of your life feel in equilibrium.",
    },
    {
      mood: "Confident",
      description:
        "Feeling sure of yourself and your abilities. It's a strong belief in your own skills and judgment.",
    },
    {
      mood: "Empowered",
      description:
        "Feeling strong and capable. It's a sense of having the power and confidence to achieve your goals.",
    },
    {
      mood: "Determined",
      description:
        "Feeling resolute and committed to a goal. It's having a strong will to succeed despite challenges.",
    },
    {
      mood: "Ambitious",
      description:
        "Feeling driven to achieve great things. It's having strong desires and goals for success.",
    },
    {
      mood: "Excited",
      description:
        "Feeling enthusiastic and eager. It's a high level of anticipation and positive energy about something.",
    },
    {
      mood: "Eager",
      description:
        "Feeling keen and enthusiastic. It's wanting to do something very much and looking forward to it.",
    },
    {
      mood: "Curious",
      description:
        "Feeling interested in learning or discovering something. It's a desire to know more about something.",
    },
    {
      mood: "Playful",
      description:
        "Feeling fun-loving and lighthearted. It's a sense of wanting to have fun and enjoy yourself.",
    },
    {
      mood: "Silly",
      description:
        "Feeling goofy and carefree. It's a lighthearted mood where you want to laugh and have fun.",
    },
    {
      mood: "Giddy",
      description:
        "Feeling lighthearted and silly with excitement. It's a bubbly, excited feeling that makes you feel happy.",
    },
    {
      mood: "Ecstatic",
      description:
        "Feeling extremely happy and excited. It's an overwhelming sense of joy and elation.",
    },
    {
      mood: "Euphoric",
      description:
        "Feeling intense happiness and well-being. It's an overwhelming sense of joy and excitement.",
    },
    {
      mood: "Radiant",
      description:
        "Feeling glowing with happiness. It's when your joy is so strong it shows in your expression and energy.",
    },
    {
      mood: "Loved",
      description:
        "Feeling cared for and valued by others. It's a warm sense of being appreciated and cherished.",
    },
    {
      mood: "Appreciated",
      description:
        "Feeling recognized and valued. It's when you feel that others see and value your contributions.",
    },
    {
      mood: "Valued",
      description:
        "Feeling important and appreciated. It's a sense that you matter and are respected by others.",
    },
    {
      mood: "Supported",
      description:
        "Feeling helped and encouraged by others. It's knowing that people are there for you and believe in you.",
    },
    {
      mood: "Understood",
      description:
        "Feeling that others truly get you. It's when someone comprehends your feelings, thoughts, or situation.",
    },
    {
      mood: "Accepted",
      description:
        "Feeling welcomed and included. It's a sense of belonging and being embraced for who you are.",
    },
    {
      mood: "Connected",
      description:
        "Feeling close to others. It's a sense of having meaningful relationships and bonds with people.",
    },
  ];

  // Note: Emotions are now fetched from API and calculated based on impact/joyfulness

  // Get pleasantness label
  const getPleasantnessLabel = (value) => {
    if (value <= 2) return "Very Low";
    if (value <= 3) return "Low";
    if (value <= 4) return "Neutral";
    if (value <= 5) return "Moderate";
    if (value <= 6) return "High";
    return "Very High";
  };

  // Get impact label
  const getImpactLabel = (value) => {
    if (value <= 2) return "Very Low";
    if (value <= 3) return "Low";
    if (value <= 4) return "Neutral";
    if (value <= 5) return "Moderate";
    if (value <= 6) return "High";
    return "Very High";
  };

  // Handle feeling description input change
  const handleFeelingDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, feelingDescription: value });

    // Show suggestions only if user is typing AND there are API moods available
    if (value.trim().length > 0 && moods.length > 0) {
      // Only use API moods - no fallback to hardcoded definitions
      const filtered = moods
        .filter(
          (mood) =>
            mood.name?.toLowerCase().includes(value.toLowerCase()) ||
            mood.emotion?.name?.toLowerCase().includes(value.toLowerCase()) ||
            mood.zone?.description
              ?.toLowerCase()
              .includes(value.toLowerCase()) ||
            mood.zone?.name?.toLowerCase().includes(value.toLowerCase())
        )
        .map((mood) => ({
          mood: mood.name,
          description: mood.zone?.description || mood.zone?.name || "",
          emotion: mood.emotion?.name || "",
          zone: mood.zone?.name || "",
        }));

      // Only show suggestions if there are matches in API data
      setAutocompleteSuggestions(filtered.slice(0, 5)); // Show top 5 matches
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      // Hide suggestions if no input or no API moods available
      setShowSuggestions(false);
      setAutocompleteSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (mood) => {
    // Only use the mood name/content (which already contains "Emotion - Zone Description")
    setFormData({
      ...formData,
      feelingDescription: mood.mood,
    });
    setShowSuggestions(false);
    setAutocompleteSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || autocompleteSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionSelect(autocompleteSuggestions[selectedSuggestionIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
      if (
        subCategorySuggestionsRef.current &&
        !subCategorySuggestionsRef.current.contains(event.target) &&
        subCategoryInputRef.current &&
        !subCategoryInputRef.current.contains(event.target)
      ) {
        setShowSubCategorySuggestions(false);
        setSelectedSubCategoryIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle subcategory input change
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, subCategory: value });

    // Show suggestions only if user is typing AND there are subcategories available
    if (value.trim().length > 0 && subCategories.length > 0) {
      const filtered = subCategories.filter((subCat) =>
        subCat.name?.toLowerCase().includes(value.toLowerCase())
      );

      setSubCategorySuggestions(filtered.slice(0, 5)); // Show top 5 matches
      setShowSubCategorySuggestions(filtered.length > 0);
      setSelectedSubCategoryIndex(-1);
    } else {
      setShowSubCategorySuggestions(false);
      setSubCategorySuggestions([]);
      setSelectedSubCategoryIndex(-1);
    }
  };

  // Handle subcategory suggestion selection
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategoryData(subCategory);
    setShowSubCategorySuggestions(false);
    setSubCategorySuggestions([]);
    setSelectedSubCategoryIndex(-1);

    // Auto-select category if subcategory has one category
    let categoryName = "";
    let categoryId = null;

    if (subCategory.category) {
      categoryName = subCategory.category.name;
      categoryId = subCategory.category.id;
      setSelectedCategories([subCategory.category.id]);
    } else if (subCategory.categoryId) {
      // If category data not included, find it from categories list
      const category = categories.find((c) => c.id === subCategory.categoryId);
      if (category) {
        categoryName = category.name;
        categoryId = category.id;
        setSelectedCategories([category.id]);
      }
    }

    // Update form data once with all values
    setFormData((prev) => ({
      ...prev,
      subCategory: subCategory.name,
      subCategoryId: subCategory.id,
      category: categoryName,
      categoryId: categoryId,
      addNote: "", // Clear add note when subcategory is selected
    }));
  };

  // Handle keyboard navigation for subcategory
  const handleSubCategoryKeyDown = (e) => {
    if (!showSubCategorySuggestions || subCategorySuggestions.length === 0)
      return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSubCategoryIndex((prev) =>
        prev < subCategorySuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSubCategoryIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedSubCategoryIndex >= 0) {
      e.preventDefault();
      handleSubCategorySelect(subCategorySuggestions[selectedSubCategoryIndex]);
    } else if (e.key === "Escape") {
      setShowSubCategorySuggestions(false);
      setSelectedSubCategoryIndex(-1);
    }
  };

  // Helper function to get color for emotion
  const getEmotionColor = (emotion) => {
    const emotionColors = {
      Sad: "#3b82f6",
      Calm: "#10b981",
      Angry: "#ef4444",
      Joy: "#10b981",
      Complacent: "#f59e0b",
      Neutral: "#f59e0b",
      Happy: "#10b981",
      Anxious: "#f59e0b",
      Stressed: "#f97316",
    };
    return emotionColors[emotion] || "#6b7280";
  };

  // Helper function to get color for zone
  const getZoneColor = (zone) => {
    const zoneColors = {
      Green: "#10b981",
      Yellow: "#f59e0b",
      Brown: "#8b4513",
      "Light Red": "#ff6b6b",
      "Dark Red": "#dc2626",
      Blue: "#3b82f6",
    };
    return zoneColors[zone] || "#6b7280";
  };

  // Calculate emotion and zone based on impact and pleasantness
  const calculateEmotionAndZone = (impact, pleasantness) => {
    // Lookup table based on Impact and Pleasantness values
    const emotionZoneLookup = {
      "1-1": { emotion: "Depressed", zone: "Light Red" },
      "1-2": { emotion: "Discouraged", zone: "Light Red" },
      "1-3": { emotion: "Exhausted", zone: "Brown" },
      "1-4": { emotion: "Uneasy", zone: "Yellow" },
      "1-5": { emotion: "Relaxed", zone: "Green" },
      "1-6": { emotion: "Comfortable", zone: "Green" },
      "1-7": { emotion: "Serene", zone: "Green" },
      "2-1": { emotion: "Lonely", zone: "Light Red" },
      "2-2": { emotion: "Miserable", zone: "Light Red" },
      "2-3": { emotion: "Tired", zone: "Brown" },
      "2-4": { emotion: "Bored", zone: "Yellow" },
      "2-5": { emotion: "Thoughtful", zone: "Green" },
      "2-6": { emotion: "Hopeful", zone: "Green" },
      "2-7": { emotion: "Carefree", zone: "Green" },
      "3-1": { emotion: "Frightened", zone: "Light Red" },
      "3-2": { emotion: "Worried", zone: "Light Red" },
      "3-3": { emotion: "Concerned", zone: "Brown" },
      "3-4": { emotion: "Complacent", zone: "Yellow" },
      "3-5": { emotion: "Focused", zone: "Green" },
      "3-6": { emotion: "Peaceful", zone: "Green" },
      "3-7": { emotion: "Touched", zone: "Green" },
      "4-1": { emotion: "Disgusted", zone: "Dark Red" },
      "4-2": { emotion: "Angry", zone: "Dark Red" },
      "4-3": { emotion: "Disappointed", zone: "Brown" },
      "4-4": { emotion: "Satisfied", zone: "Yellow" },
      "4-5": { emotion: "Optimistic", zone: "Blue" },
      "4-6": { emotion: "Joyful", zone: "Blue" },
      "4-7": { emotion: "Grateful", zone: "Blue" },
      "5-1": { emotion: "Fuming", zone: "Dark Red" },
      "5-2": { emotion: "Frustrated", zone: "Dark Red" },
      "5-3": { emotion: "Irritated", zone: "Brown" },
      "5-4": { emotion: "Energized", zone: "Yellow" },
      "5-5": { emotion: "Cheerful", zone: "Blue" },
      "5-6": { emotion: "Proud", zone: "Blue" },
      "5-7": { emotion: "Blissful", zone: "Blue" },
      "6-1": { emotion: "Furious", zone: "Dark Red" },
      "6-2": { emotion: "Nervous", zone: "Dark Red" },
      "6-3": { emotion: "Restless", zone: "Brown" },
      "6-4": { emotion: "Lively", zone: "Yellow" },
      "6-5": { emotion: "Enthusiastic", zone: "Blue" },
      "6-6": { emotion: "Motivated", zone: "Blue" },
      "6-7": { emotion: "Thrilled", zone: "Blue" },
      "7-1": { emotion: "Enraged", zone: "Dark Red" },
      "7-2": { emotion: "Panicked", zone: "Dark Red" },
      "7-3": { emotion: "Shocked", zone: "Brown" },
      "7-4": { emotion: "Hyper", zone: "Yellow" },
      "7-5": { emotion: "Surprised", zone: "Blue" },
      "7-6": { emotion: "Inspired", zone: "Blue" },
      "7-7": { emotion: "Exhilarated", zone: "Blue" },
    };

    const key = `${impact}-${pleasantness}`;
    const result = emotionZoneLookup[key];

    if (result) {
      return {
        calculatedEmotion: result.emotion,
        calculatedZone: result.zone,
      };
    }

    // Default fallback if combination not found
    return {
      calculatedEmotion: "Unknown",
      calculatedZone: "Yellow",
    };
  };

  // Update calculated emotion/zone when impact or joyfulness changes
  useEffect(() => {
    const { calculatedEmotion, calculatedZone } = calculateEmotionAndZone(
      formData.impact,
      formData.pleasantness
    );
    setFormData((prev) => ({
      ...prev,
      calculatedEmotion,
      calculatedZone,
    }));
  }, [formData.impact, formData.pleasantness]);

  const handleSubmit = () => {
    if (!formData.feelingDescription.trim()) {
      alert("Please describe how you feel");
      return;
    }
    if (!formData.subCategory && !formData.addNote.trim()) {
      alert("Please select a sub category or add a note");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      // Check if the feeling description is a custom entry (not in existing moods)
      const existingMood = moods.find(
        (mood) =>
          mood.name?.toLowerCase() ===
          formData.feelingDescription.trim().toLowerCase()
      );

      let moodToUse = formData.feelingDescription;

      // If it's a custom mood (not in master data), create it in master data first
      if (!existingMood && formData.feelingDescription.trim()) {
        try {
          // Get a default emotion and zone for the custom mood
          // You can adjust this logic based on your requirements
          const defaultEmotion =
            emotions.find((e) => e.name === formData.calculatedEmotion) ||
            emotions[0];
          const defaultZone =
            zones.find((z) => z.name === formData.calculatedZone) || zones[0];

          // Create new mood in Master Admin's mood data
          const newMoodData = {
            name: formData.feelingDescription.trim(),
            code: `CUSTOM_${Date.now().toString().slice(-8)}`, // Unique code
            emotionId: defaultEmotion ? defaultEmotion.id : 1, // Use calculated emotion or default
            zoneId: defaultZone ? defaultZone.id : 1, // Use calculated zone or default
            status: true, // Set to active so it can be used immediately
          };

          await axios.post(`${SERVER_URL}`, newMoodData);

          console.log("Custom mood added to master data successfully");
        } catch (moodError) {
          console.error("Error creating mood in master data:", moodError);
          console.log("Error details:", moodError.response?.data);
          // Continue with mood log submission even if mood creation fails
        }
      }

      // Prepare data for submission
      const moodLogData = {
        studentId: 1, // TODO: Replace with actual logged-in student ID from auth context
        date: formData.date,
        time: formData.time,
        feelingDescription: moodToUse,
        categoryId: formData.categoryId || null,
        subCategoryId: formData.subCategoryId || null,
        addNote: formData.addNote || "",
        impact: formData.impact,
        joyfulness: formData.pleasantness, // Backend uses 'joyfulness' field name
        calculatedEmotion: formData.calculatedEmotion,
        calculatedZone: formData.calculatedZone,
        status: true,
      };

      console.log("Submitting mood log data:", moodLogData);

      // Submit to backend API
      const response = await axios.post(
        `${API_BASE_URL}/student-mood-logs`,
        moodLogData
      );

      if (response.status === 201) {
        if (!existingMood && formData.feelingDescription.trim()) {
          alert(
            "Mood logged successfully! Your custom mood has been submitted to admin for review."
          );
        } else {
          alert("Mood logged successfully!");
        }
        navigate("/student/mood-history");
      }
    } catch (error) {
      console.error("Error submitting mood log:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      // Show detailed error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to log mood. Please try again.";
      alert(
        `Error: ${errorMessage}\n\nPlease make sure the backend server is restarted.`
      );
    }
  };

  return (
    <div className="student-container">
      {/* Main Form Container */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 32px 0",
            color: "#222",
          }}
        >
          What are you feeling right now?
        </h2>

        {/* Date and Time Display */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <div>
            <strong>Date:</strong> {formData.date}
          </div>
          <div>
            <strong>Time:</strong> {formData.time}
          </div>
        </div>

        {/* Feeling Description Input */}
        <div
          className="form-group"
          style={{ marginBottom: "28px", position: "relative" }}
        >
          <label
            className="form-label"
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "8px",
              display: "block",
            }}
          >
            How are you feeling? (Select from suggestions or type your own)
          </label>
          <textarea
            ref={textareaRef}
            className="form-textarea"
            placeholder="Type how you feel right now... (e.g., 'Happy - Feeling joyful today' or create your own description)"
            value={formData.feelingDescription}
            onChange={handleFeelingDescriptionChange}
            onKeyDown={handleKeyDown}
            style={{
              minHeight: "120px",
              fontSize: "16px",
              fontStyle: formData.feelingDescription ? "normal" : "italic",
              color: formData.feelingDescription ? "#222" : "#999",
            }}
          />
          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && autocompleteSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                marginTop: "4px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  padding: "8px 16px",
                  background: "#f9f9f9",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "12px",
                  color: "#666",
                  fontWeight: "600",
                }}
              >
                Suggested Moods (or keep typing to create your own)
              </div>
              {autocompleteSuggestions.map((mood, index) => (
                <div
                  key={mood.mood || index}
                  onClick={() => handleSuggestionSelect(mood)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom:
                      index < autocompleteSuggestions.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    background:
                      index === selectedSuggestionIndex ? "#f5f5f5" : "#fff",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#222",
                      lineHeight: "1.4",
                    }}
                  >
                    {mood.mood}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Helper text */}
          <div
            style={{
              fontSize: "12px",
              color: "#888",
              marginTop: "6px",
              fontStyle: "italic",
            }}
          >
            💡 Start typing to see suggestions, or create your own custom mood
            description. Custom moods will be reviewed by admin and added to the
            system.
          </div>
        </div>

        {/* Sub Category Input */}
        <div
          className="form-group"
          style={{ marginBottom: "32px", position: "relative" }}
        >
          <label
            className="form-label"
            style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
          >
            Sub category (auto-suggested)
          </label>
          <input
            ref={subCategoryInputRef}
            type="text"
            className="form-input"
            placeholder="e.g., Outing With Family, Play With Family"
            value={formData.subCategory}
            onChange={handleSubCategoryChange}
            onKeyDown={handleSubCategoryKeyDown}
          />
          {/* Subcategory Autocomplete Suggestions Dropdown */}
          {showSubCategorySuggestions && subCategorySuggestions.length > 0 && (
            <div
              ref={subCategorySuggestionsRef}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                marginTop: "4px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {subCategorySuggestions.map((subCat, index) => (
                <div
                  key={subCat.id || index}
                  onClick={() => handleSubCategorySelect(subCat)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom:
                      index < subCategorySuggestions.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    background:
                      index === selectedSubCategoryIndex ? "#f5f5f5" : "#fff",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={() => setSelectedSubCategoryIndex(index)}
                  onMouseLeave={() => setSelectedSubCategoryIndex(-1)}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#222",
                      lineHeight: "1.4",
                    }}
                  >
                    {subCat.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Display/Selection */}
        {formData.subCategory && formData.category && (
          <div className="form-group" style={{ marginBottom: "32px" }}>
            <label
              className="form-label"
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              Category (auto-selected)
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.category}
              readOnly
              style={{ background: "#f5f5f5", cursor: "not-allowed" }}
            />
          </div>
        )}

        {/* Add Note Field */}
        {!formData.subCategory && (
          <div className="form-group" style={{ marginBottom: "32px" }}>
            <label
              className="form-label"
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              Add note (if sub category doesn't apply)
            </label>
            <textarea
              className="form-textarea"
              placeholder="Explain your mood in more detail..."
              value={formData.addNote}
              onChange={(e) =>
                setFormData({ ...formData, addNote: e.target.value })
              }
              style={{
                minHeight: "100px",
                fontSize: "14px",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#888",
                marginTop: "4px",
                fontStyle: "italic",
              }}
            >
              Note: This will be reviewed by Super Admin to create a new sub
              category if needed.
            </div>
          </div>
        )}

        {/* Question: Can you explain a little more about why you are experiencing this emotion? */}
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#444",
              marginBottom: "24px",
            }}
          >
            Can you explain a little more about why you are experiencing this
            emotion?
          </h3>

          {/* Impact Slider */}
          <div className="slider-group" style={{ marginBottom: "32px" }}>
            <div className="slider-label" style={{ marginBottom: "16px" }}>
              <label
                className="form-label"
                style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
              >
                Impact
              </label>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                {formData.impact}/7
              </span>
            </div>
            <div
              style={{
                background: "#f9f9f9",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "12px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Scale:</strong> Rate the impact of the emotion you are
                currently going through or feeling on a scale from 1 to 7, with
                1 being a significantly low impact on you and something that can
                be easily overcome and 7 being the highest impact which can be
                difficult to overcome and can be long lasting.
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={formData.impact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    impact: parseInt(e.target.value),
                  })
                }
                className="slider-gradient"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "8px",
                }}
              >
                <span>1 - Low Impact (Easily Overcome)</span>
                <span>4 - Neutral</span>
                <span>7 - High Impact (Long Lasting)</span>
              </div>
            </div>
          </div>

          {/* Pleasantness Slider */}
          <div className="slider-group" style={{ marginBottom: "32px" }}>
            <div className="slider-label" style={{ marginBottom: "16px" }}>
              <label
                className="form-label"
                style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
              >
                Pleasantness
              </label>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                {formData.pleasantness}/7
              </span>
            </div>
            <div
              style={{
                background: "#f9f9f9",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "12px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Scale:</strong> Rate the pleasantness of the emotion you
                are currently going through or feeling on a scale from 1 to 7,
                with 1 being the lowest pleasantness you are feeling and 7 being
                the highest pleasantness you are feeling right now.
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={formData.pleasantness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pleasantness: parseInt(e.target.value),
                  })
                }
                className="slider-gradient"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "8px",
                }}
              >
                <span>1 - Lowest Pleasantness</span>
                <span>4 - Neutral</span>
                <span>7 - Highest Pleasantness</span>
              </div>
            </div>
          </div>

          {/* Calculated Emotion and Zone Display */}
          {(formData.calculatedEmotion || formData.calculatedZone) && (
            <div
              style={{
                background: "#e8f5e9",
                padding: "16px",
                borderRadius: "10px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "12px",
                }}
              >
                Calculated based on your Impact and Pleasantness values:
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                {formData.calculatedEmotion && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: getEmotionColor(
                          formData.calculatedEmotion
                        ),
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#222",
                      }}
                    >
                      {formData.calculatedEmotion}
                    </span>
                  </div>
                )}
                {formData.calculatedZone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: getZoneColor(formData.calculatedZone),
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#222",
                      }}
                    >
                      {formData.calculatedZone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/student/dashboard")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Mood Log
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                Are you want to submit? Please confirm to proceed
              </h3>
              <button
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "grid", gap: "16px" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "4px",
                      }}
                    >
                      Feeling Description
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {formData.feelingDescription || "N/A"}
                    </div>
                  </div>
                  {formData.subCategory && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                        }}
                      >
                        Sub Category
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        {formData.subCategory}
                      </div>
                    </div>
                  )}
                  {formData.addNote && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                        }}
                      >
                        Add Note
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        {formData.addNote}
                      </div>
                    </div>
                  )}
                  {formData.category && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                        }}
                      >
                        Category
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        {formData.category}
                      </div>
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "4px",
                      }}
                    >
                      Impact & Pleasantness
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      Impact: {formData.impact}/7 | Pleasantness:{" "}
                      {formData.pleasantness}/7
                    </div>
                  </div>
                  {(formData.calculatedEmotion || formData.calculatedZone) && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "8px",
                        }}
                      >
                        Calculated Emotion & Zone
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        {formData.calculatedEmotion && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: getEmotionColor(
                                  formData.calculatedEmotion
                                ),
                                border: "2px solid #fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <span
                              style={{ fontWeight: "600", fontSize: "14px" }}
                            >
                              {formData.calculatedEmotion}
                            </span>
                          </div>
                        )}
                        {formData.calculatedZone && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: getZoneColor(
                                  formData.calculatedZone
                                ),
                                border: "2px solid #fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <span
                              style={{ fontWeight: "600", fontSize: "14px" }}
                            >
                              {formData.calculatedZone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Please review your mood log details before submitting.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiCheck /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogMood;
