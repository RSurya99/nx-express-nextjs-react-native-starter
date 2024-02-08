// React Native
import { StyleSheet } from "react-native";

// Constants
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
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
  form: {
    marginTop: SIZES.large,
    gap: SIZES.small
  },
  input: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small / 1.5,
    borderRadius: SIZES.small / 1.25,
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 1.25,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small / 1.5,
  },
  btnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small
  },
  toggle: {
    width: 'auto',
    alignSelf: 'flex-start',
  }
});

export default styles
