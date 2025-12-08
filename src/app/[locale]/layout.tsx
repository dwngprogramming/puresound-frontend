import {Manrope} from 'next/font/google'
import "@/styles/globals.css";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/libs/i18n/routing';
import React from "react";
import {HeroUILibProviders} from "@/context/heroui-provider";
import {ReactQueryProvider} from "@/context/react-query-provider";
import {ReduxProvider} from "@/context/redux-provider";
import NavigationProvider from "@/context/navigation-provider";
import NotificationMessageContainer from "@/components/Notification/NotificationMessageContainer";
import I18nProvider from "@/context/i18n-provider";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export default async function LocaleLayout({
                                             children,
                                             params
                                           }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    <body
      className={`${manrope.variable} ${manrope.className} antialiased`}
    >
    <ReduxProvider>
      <NextIntlClientProvider messages={messages}>
        <I18nProvider />
        <ReactQueryProvider>
          <HeroUILibProviders>
            <NavigationProvider/>
            {children}
            <NotificationMessageContainer/>
          </HeroUILibProviders>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </ReduxProvider>
    </body>
    </html>
  );
}
