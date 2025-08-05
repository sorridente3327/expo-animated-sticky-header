import { PROFILE_PICTURES } from "@/constants";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const HeaderImage = ({
  scrollY,
  locked,
  onLockChange,
  modalEnable,
}: {
  scrollY: SharedValue<number>;
  locked?: boolean;
  modalEnable?: boolean;
  onLockChange?: (isLocked: boolean) => void;
}) => {
  const isLocked = useSharedValue(false);
  const thresholdExpand = 100;
  const thresholdCollapse = -150;
  const isExpanded = useSharedValue(modalEnable);

  useEffect(() => {
    isExpanded.value = modalEnable;
  }, [modalEnable]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const stretch = -scrollY.value;

    if (stretch >= thresholdExpand && !isLocked.value) {
      isLocked.value = true;
      locked = true;
      if (onLockChange) {
        runOnJS(onLockChange)(true);
      }
    }

    if (stretch < thresholdCollapse && isLocked.value) {
      isLocked.value = false;
      locked = false;
      if (onLockChange) {
        runOnJS(onLockChange)(false);
      }
    }

    let targetWidth = 130;
    let targetHeight = 130;
    let targetRadius = 65;

    if (isLocked.value) {
      targetWidth = SCREEN_WIDTH;
      targetHeight = SCREEN_HEIGHT / 2;
      targetRadius = 40;
    } else {
      targetWidth = interpolate(
        stretch,
        [0, thresholdExpand],
        [130, SCREEN_WIDTH],
        Extrapolation.CLAMP
      );
      targetHeight = interpolate(
        stretch,
        [0, thresholdExpand],
        [130, SCREEN_HEIGHT / 2],
        Extrapolation.CLAMP
      );
      targetRadius = interpolate(
        stretch,
        [0, thresholdExpand],
        [65, 40],
        Extrapolation.CLAMP
      );
    }

    return {
      width: withTiming(targetWidth, { duration: 500 }),
      height: withTiming(targetHeight, { duration: 500 }),
      borderRadius: withTiming(targetRadius, { duration: 500 }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          zIndex: 1,
          width: SCREEN_WIDTH,
          height: 400,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Animated.Image
        source={{ uri: PROFILE_PICTURES[0] }}
        style={[styles.profileImage, imageAnimatedStyle]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: "center",
    marginTop: 40,
  },
});
