import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { divide, multiply } from "react-native-reanimated";
import Slide, { SLIDER_HEIGHT } from "../../components/Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from "react-native-redash/src";

const { width } = Dimensions.get("window");
const BORDER_RADIUS = 75;

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const slides = [
    {
      title: "Relaxed",
      subtitle: "Build Delightful",
      description:
        "Learn React Native Gesture Handler and Reanimated to build user experiences that run at 60 fps, even on low-end devices.",
      color: "#BFEAF5",
    },
    {
      title: "Playful",
      subtitle: "Build Delightful",
      description:
        "Learn React Native Gesture Handler and Reanimated to build user experiences that run at 60 fps, even on low-end devices.",
      color: "#BEECC4",
    },
    {
      title: "Eccentric",
      subtitle: "Build Delightful",
      description:
        "Learn React Native Gesture Handler and Reanimated to build user experiences that run at 60 fps, even on low-end devices.",
      color: "#FFE4D9",
    },
    {
      title: "Funky",
      subtitle: "Build Delightful",
      description:
        "Learn React Native Gesture Handler and Reanimated to build user experiences that run at 60 fps, even on low-end devices.",
      color: "#FFDDDD",
    },
  ];

  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  }) as any;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ scrollHandler }}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
            },
            { transform: [{ translateX: multiply(x, -1) as any }]}
          ]}
        >
          <View style={styles.pagination}>
            {
              slides.map((_, index) => (
                <Dot key={index} currentIndex={divide(x, width)} {...{index}} 
                />
              ))
            }
          </View>
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              key={index}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
              onPress={() => {
                if (scroll.current) {
                  scroll.current
                    .getNode()
                    .scrollTo({ x: width * (index + 1), animated: true });
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
    height: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width
  },
});
export default Onboarding;
