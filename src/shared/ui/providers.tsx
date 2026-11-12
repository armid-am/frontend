import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@ui";
import { Toaster } from "react-hot-toast";
import { getMessages } from "next-intl/server";

interface Props {
  children: React.ReactNode;
  locale: string;
}

export const Providers: React.FC<Props> = async (props) => {
  const { children, locale } = props;
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </NextIntlClientProvider>
  );
};
