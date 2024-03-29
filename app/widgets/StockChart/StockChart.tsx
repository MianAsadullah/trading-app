import { memo, useState } from "react";
import { SymbolOverview } from "react-tradingview-embed";
import json from "./StockChart.json";
import Widget from "../../components/widget/widget";
import { WidgetWidth } from "../../utils/constants";
import { PubSubEvent, useSub } from "../../hooks/usePubSub";
import { hToPx } from "../../utils/appUtils";

type Props = {
  wid: string;
  symbol: string;
};

export default function StockChart({ wid, symbol }: Props) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [theme, setTheme] = useState(
    window?.localStorage.getItem("nightwind-mode") ?? "dark"
  );
  useSub(PubSubEvent.ThemeChange, () => {
    setTheme(window?.localStorage.getItem("nightwind-mode") ?? "dark");
  });

  // memo: to avoid re-rendering (when moving widget)
  // eslint-disable-next-line react/display-name
  const Chart = memo(() => {
    return (
      <>
        <div id={wid + "-container"}></div>
        <SymbolOverview
          key={wid + "-" + theme}
          widgetProps={{
            container_id: wid + "-container",
            width: WidgetWidth - 2,
            height: hToPx(json.info.h) - 2,
            symbols: [currentSymbol],
            colorTheme: theme,
          }}
        />
      </>
    );
  });

  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="overflow-hidden"
      onSettings={({ settings }) => {
        setCurrentSymbol(settings?.symbol ?? symbol); // default to symbol prop if no settings
      }}
      render={() => {
        return <Chart />;
      }}
    />
  );
}
