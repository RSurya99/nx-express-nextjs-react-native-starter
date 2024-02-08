// React Native
import { StyleSheet } from "react-native";

// Constants
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  cardsContainer: {
    marginTop: SIZES.xLarge,
    gap: SIZES.small,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 1.5
  }
});

export default styles;
