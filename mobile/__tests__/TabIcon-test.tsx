import React from "react";
import { render } from '@testing-library/react-native';
import { TabIcon } from "../app/(tabs)/_layout";
import { icons } from "@/constants/icons";

describe("TabIcon", () => {
  it("renders focused tab icon with background and title", () => {
    const { getByText, getByTestId } = render(
      <TabIcon focused={true} icon={icons.home} title="Чат" />
    );

    expect(getByText("Чат")).toBeTruthy();
    expect(getByTestId("tab-icon-image")).toBeTruthy();
  });

  it("renders unfocused tab icon without title", () => {
    const { queryByText, getByTestId } = render(
      <TabIcon focused={false} icon={icons.home} title="Чат" />
    );

    expect(queryByText("Чат")).toBeNull();
    expect(getByTestId("tab-icon-image")).toBeTruthy();
  });
});
