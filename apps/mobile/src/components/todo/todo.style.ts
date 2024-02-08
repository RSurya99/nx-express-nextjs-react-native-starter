// React Native
import { StyleSheet } from "react-native";

// Constants
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionWrapper: {
    flexDirection: 'row',
    gap: SIZES.small / 2
  },
  btnWarning: {
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 1.5,
    backgroundColor: COLORS.warning,
    borderRadius: SIZES.small / 1.25,
  },
  btnDanger: {
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 1.5,
    backgroundColor: COLORS.danger,
    borderRadius: SIZES.small / 1.25,
  },
  btnText: {
    color: COLORS.white,
  }
});

export default styles;
