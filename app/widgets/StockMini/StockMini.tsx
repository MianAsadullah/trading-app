import { memo, useMemo, useState } from "react";
import { MiniChart, SymbolOverview } from "react-tradingview-embed";
import json from "./StockMini.json";
import Widget from "../../components/widget/widget";
import { WidgetHeight, WidgetWidth } from "../../utils/constants";
import { PubSubEvent, useSub } from "../../hooks/usePubSub";

type Props = {
  wid: string;
  symbol: string;
};

export default function StockMini({ wid, symbol }: Props) {
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
      <MiniChart
        key={wid + "-" + theme}
        widgetProps={{
          width: WidgetWidth,
          height: WidgetHeight - 2,
          symbol: currentSymbol,
          colorTheme: theme,
        }}
      />
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
