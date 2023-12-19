import i18next from "i18next";
import Page from "@/components/Page";
import { LAYOUT } from "@/layouts";

export default function AppIndex() {
  return (
    <Page title={i18next.t`home.title`}>
      <h1>AppIndex</h1>
    </Page>
  );
}

AppIndex.layout = LAYOUT.dashboard;
