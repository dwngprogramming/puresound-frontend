import type {Metadata} from "next";
import {Manrope} from 'next/font/google'
import "@/styles/globals.css";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/libs/i18n/routing';
import React from "react";
import {HeroUILibProviders} from "@/context/heroui-provider";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.home');

  return {
    title: t('title'),
    description: t('description'),
  };
}

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
    <NextIntlClientProvider messages={messages}>
      <HeroUILibProviders>
        {children}
      </HeroUILibProviders>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
