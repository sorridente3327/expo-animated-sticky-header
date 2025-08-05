import { HeaderImage } from "@/components/AnimatedImage";
import { posts, stories, suggestions } from "@/constants/index";
import { headerStyles as styles } from "@/stylesheet/index";
import { Header } from "@react-navigation/elements";
import { Stack, useRouter, type Router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { AnimatedScrollView, HeaderNavBar } from "glow-ui/headers/parallax";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const HeaderDemo: React.FC = (): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<"posts" | "media" | "about">(
    "posts"
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([1, 3]);

  const router: Router = useRouter() as Router;
  const { width } = useWindowDimensions();

  const StatsCard = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.statsCard}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  const TabButton = ({
    title,
    isActive,
    onPress,
  }: {
    title: string;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const StoryItem = ({ story }: { story: (typeof stories)[0] }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View
        style={[
          styles.storyImageContainer,
          story.hasStory && styles.storyWithBorder,
        ]}
      >
        <Image source={{ uri: story.image }} style={styles.storyImage} />
        {story.isOwn && (
          <View style={styles.addStoryButton}>
            <SymbolView name="plus" size={12} tintColor="white" />
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );

  const PostItem = ({ post }: { post: (typeof posts)[0] }) => {
    const isLiked = likedPosts.includes(post.id);

    const toggleLike = () => {
      setLikedPosts((prev) =>
        isLiked ? prev.filter((id) => id !== post.id) : [...prev, post.id]
      );
    };

    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.postUserInfo}>
            <Image
              source={{
                uri: "https://i.pinimg.com/1200x/25/21/d0/2521d03fd6606b8792c8acc917558b0a.jpg",
              }}
              style={styles.postUserImage}
            />
            <View>
              <Text style={styles.postUsername}>Rit3zh</Text>
              <Text style={styles.postTimestamp}>{post.timestamp}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.postMoreButton}>
            <SymbolView name="ellipsis" size={16} tintColor="#6B7280" />
          </TouchableOpacity>
        </View>

        <Text style={styles.postContent}>{post.content}</Text>

        {post.images && (
          <Image source={{ uri: post.images[0] }} style={styles.postImage} />
        )}

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
            <SymbolView
              name={isLiked ? "heart.fill" : "heart"}
              size={20}
              tintColor={isLiked ? "#EF4444" : "#6B7280"}
            />
            <Text style={[styles.actionText, isLiked && styles.likedText]}>
              {post.likes +
                (isLiked && !post.isLiked
                  ? 1
                  : isLiked || post.isLiked
                  ? 0
                  : -1)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <SymbolView name="message" size={20} tintColor="#6B7280" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <SymbolView
              name="arrowshape.turn.up.right"
              size={20}
              tintColor="#6B7280"
            />
            <Text style={styles.actionText}>{post.shares}</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />

          <TouchableOpacity style={styles.actionButton}>
            <SymbolView name="bookmark" size={20} tintColor="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const SuggestionCard = ({
    suggestion,
  }: {
    suggestion: (typeof suggestions)[0];
  }) => (
    <View style={styles.suggestionCard}>
      <Image
        source={{ uri: suggestion.image }}
        style={styles.suggestionImage}
      />
      <View style={styles.suggestionInfo}>
        <Text style={styles.suggestionName}>{suggestion.name}</Text>
        <Text style={styles.suggestionUsername}>{suggestion.username}</Text>
        <Text style={styles.suggestionMutual}>
          {suggestion.mutualFriends} mutual friends
        </Text>
      </View>
      <TouchableOpacity style={styles.followSmallButton}>
        <Text style={styles.followSmallButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  const scrollY = useSharedValue(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScrollChange = (y: number) => {
    scrollY.value = y;
    if (y < -150 && !isImageExpanded) {
      runOnJS(setIsImageExpanded)(true);
    }
  };

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(isLocked ? -SCREEN_WIDTH / 2 + 85 : 0, {
      duration: 500,
    });
    const translateY = withTiming(isLocked ? -19 : -10, {
      duration: 500,
    });
    return {
      transform: [{ translateX }, { translateY: translateY }],
      fontSize: withTiming(isLocked ? 40 : 30, {
        duration: 500,
      }),
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(
      isLocked ? -SCREEN_WIDTH / 2 + SCREEN_WIDTH / 4 : 0,
      {
        duration: 500,
      }
    );
    const translateY = withTiming(isLocked ? -5 : 5, {
      duration: 500,
    });
    return {
      transform: [{ translateX }, { translateY: translateY }],
      fontSize: withTiming(isLocked ? 20 : 17, {
        duration: 500,
      }),
      color: withTiming(isLocked ? "#D1D5DB" : "#bdbdbd", {
        duration: 500,
      }),
    };
  });

  const verifiedBadgeStyle = useAnimatedStyle(() => {
    const translateX = withTiming(
      isLocked ? -SCREEN_WIDTH / 2 + SCREEN_WIDTH / 4.5 : 0,
      {
        duration: 500,
      }
    );
    const translateY = withTiming(isLocked ? 110 : 120, {
      duration: 500,
    });
    return {
      transform: [
        { translateX },
        {
          translateY: translateY,
        },
      ],
      fontSize: withTiming(isLocked ? 20 : 17, {
        duration: 500,
      }),
    };
  });
  const verifiedProBadgeStyle = useAnimatedStyle(() => {
    const translateX = withTiming(
      isLocked ? -SCREEN_WIDTH / 2 + SCREEN_WIDTH / 4.5 : 0,
      {
        duration: 500,
      }
    );
    const translateY = withTiming(isLocked ? 110 : 120, {
      duration: 500,
    });
    return {
      transform: [
        { translateX },
        {
          translateY: translateY,
        },
      ],
      fontSize: withTiming(isLocked ? 20 : 17, {
        duration: 500,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Stack.Screen options={{ headerShown: false }} />

      <AnimatedScrollView
        onScrollValueChange={handleScrollChange}
        showsVerticalScrollIndicator={false}
        renderHeaderNavBarComponent={() => (
          <Header
            headerBackground={() => <></>}
            title=""
            headerLeft={() => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => router.back()}
              >
                <SymbolView
                  name="chevron.backward"
                  size={20}
                  tintColor="white"
                  resizeMode="scaleAspectFit"
                />
              </TouchableOpacity>
            )}
            headerRight={() => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity style={styles.headerButton}>
                  <SymbolView
                    name="square.and.arrow.up"
                    size={18}
                    tintColor="white"
                    resizeMode="scaleAspectFit"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <SymbolView
                    name="ellipsis"
                    size={18}
                    tintColor="white"
                    resizeMode="scaleAspectFit"
                  />
                </TouchableOpacity>
              </View>
            )}
            headerBackgroundContainerStyle={styles.headerBackground}
          />
        )}
        renderTopNavBarComponent={() => (
          <HeaderNavBar>
            <TouchableOpacity onPress={() => router.back()}>
              <SymbolView
                name="chevron.backward"
                size={18}
                tintColor="white"
                resizeMode="scaleAspectFit"
              />
            </TouchableOpacity>
            <Text style={styles.topNavTitle}>Rit3zh</Text>
            <TouchableOpacity>
              <SymbolView
                name="ellipsis"
                size={18}
                tintColor="white"
                resizeMode="scaleAspectFit"
              />
            </TouchableOpacity>
          </HeaderNavBar>
        )}
        renderOveralComponent={() => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <View
              style={{
                height: 400,
                width: SCREEN_WIDTH,
                justifyContent: "flex-end",
                paddingHorizontal: 20,
              }}
            >
              {/* Background overlay */}
              <View style={styles.profileOverlay} />

              {/* Floating action buttons */}
              <View style={styles.floatingActions}></View>

              {/* Status indicators */}
              <Animated.Text
                style={[
                  {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                    alignSelf: "center",
                    height: 90,
                    textShadowColor: "rgba(0,0,0,0.8)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 8,
                  },
                  textAnimatedStyle,
                ]}
              >
                Rit3zh
              </Animated.Text>

              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "flex-end",
                }}
              >
                <Animated.Text
                  style={[
                    {
                      color: "white",
                      fontWeight: "600",
                      fontSize: 14,
                      alignSelf: "center",
                      height: 60,
                      textShadowColor: "rgba(0,0,0,0.6)",
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 4,
                    },
                    subtitleAnimatedStyle,
                  ]}
                >
                  Active 2 hours ago
                </Animated.Text>
              </View>

              {/* Social proof badges */}
              <View style={styles.socialBadges}>
                <Animated.View style={[styles.badge, verifiedBadgeStyle]}>
                  <SymbolView name="star.fill" size={12} tintColor="#FFD700" />
                  <Text style={styles.badgeText}>Pro</Text>
                </Animated.View>
                <Animated.View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.8)",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.2)",
                      gap: 4,
                    },
                    verifiedProBadgeStyle,
                  ]}
                >
                  <SymbolView
                    name="checkmark.seal.fill"
                    size={12}
                    tintColor="#3B82F6"
                  />
                  <Text style={styles.badgeText}>Verified</Text>
                </Animated.View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        topBarHeight={200}
        renderHeaderComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onMagicTap={() => alert("red")}
          >
            <HeaderImage
              modalEnable={isModalVisible}
              scrollY={scrollY}
              onLockChange={(lock) => setIsLocked(lock)}
            />
          </View>
        )}
      >
        <View style={styles.content}>
          <View style={styles.artistInfo}>
            <View style={styles.artistMeta}>
              <View style={styles.verifiedBadge}>
                <SymbolView
                  name="checkmark.seal.fill"
                  resizeMode="scaleAspectFit"
                  size={16}
                  tintColor="#3B82F6"
                />
                <Text style={styles.verifiedText}>Verified Developer</Text>
              </View>
              <Text style={styles.monthlyListeners}>
                Software Engineer • San Francisco
              </Text>
            </View>

            <View style={styles.statsRow}>
              <StatsCard label="Following" value="1,234" />
              <StatsCard label="Followers" value="5,678" />
              <StatsCard label="Posts" value="892" />
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  isFollowing && styles.followingButton,
                ]}
                onPress={() => setIsFollowing(!isFollowing)}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    isFollowing && styles.followingButtonText,
                  ]}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <SymbolView
                  name="bubble"
                  size={16}
                  tintColor="#E5E7EB"
                  resizeMode="scaleAspectFit"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <SymbolView
                  name="bell"
                  size={16}
                  resizeMode="scaleAspectFit"
                  tintColor="#E5E7EB"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TabButton
              title="Posts"
              isActive={activeTab === "posts"}
              onPress={() => setActiveTab("posts")}
            />
            <TabButton
              title="Media"
              isActive={activeTab === "media"}
              onPress={() => setActiveTab("media")}
            />
            <TabButton
              title="About"
              isActive={activeTab === "about"}
              onPress={() => setActiveTab("about")}
            />
          </View>

          {/* Stories Section */}
          {activeTab === "posts" && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Stories</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.storiesContainer}
                contentContainerStyle={styles.storiesContent}
              >
                {stories.map((story) => (
                  <StoryItem key={story.id} story={story} />
                ))}
              </ScrollView>

              {/* Posts */}
              <View style={styles.postsSection}>
                {posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </View>
            </>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <View style={styles.mediaGrid}>
              {[...Array(12)].map((_, index) => (
                <TouchableOpacity key={index} style={styles.mediaItem}>
                  <Image
                    source={{
                      uri: `https://images.unsplash.com/photo-${
                        1500000000000 + index
                      }?w=200&h=200&fit=crop`,
                    }}
                    style={styles.mediaImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <View style={styles.aboutContainer}>
              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>About</Text>
                <Text style={styles.aboutText}>
                  Passionate software engineer with 5+ years of experience in
                  mobile development. Love creating beautiful, intuitive user
                  experiences and sharing knowledge with the dev community.
                </Text>
              </View>

              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>Suggestions for you</Text>
                {suggestions.map((suggestion) => (
                  <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                ))}
              </View>
            </View>
          )}
        </View>
      </AnimatedScrollView>
    </View>
  );
};

export default HeaderDemo;
