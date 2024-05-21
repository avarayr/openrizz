"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BellOff, BellRing, Search, Settings, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SpinnerIcon } from "~/components/primitives/SpinnerIcon";
import { Input } from "../../../components/primitives/Input";
import { type ChatListProps } from "../../types";
import { ChatListItem } from "../components/ChatListItem";
import { Padded } from "../components/Padded";
import { ChaiColors } from "../types";
import { Tapback } from "../components/Tapback";

export const ChatList = React.memo(
  ({ chats, loading, areNotificationsEnabled, onNotificationToggle, onChatDelete }: ChatListProps) => {
    const [tapbackChatID, setTapbackChatID] = useState<string | undefined>();

    const [searchValue, setSearchValue] = useState("");
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
    function handleSearchInputFocus() {
      setIsSearchInputFocused(true);
    }

    function handleSearchInputBlur() {
      setIsSearchInputFocused(false);
      setSearchValue("");
    }

    const filteredChat = useMemo(() => {
      if (!isSearchInputFocused) return chats;

      return chats.filter((chat) => {
        const searchTerm = searchValue.toLowerCase();
        return chat.persona?.name.toLowerCase().includes(searchTerm || "__##__");
      });
    }, [chats, isSearchInputFocused, searchValue]);

    useEffect(() => {
      if (isSearchInputFocused) {
        setTimeout(() => {
          document.querySelector("meta[name='theme-color']")?.setAttribute("content", ChaiColors.ACTIVITYBAR);
        }, 100);
      } else {
        document.querySelector("meta[name='theme-color']")?.setAttribute("content", ChaiColors.BACKGROUND);
      }
    }, [isSearchInputFocused]);

    return (
      <motion.main className="flex h-dvh w-dvw flex-col overflow-x-hidden bg-black text-white antialiased">
        <AnimatePresence initial={false}>
          {!isSearchInputFocused && (
            <motion.div
              initial={{ height: 0, y: -50, opacity: 0 }}
              animate={{ height: "auto", y: 0, opacity: 1 }}
              exit={{ height: 0, y: -50, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-visible"
            >
              <Padded className="mt-16 flex items-center justify-between">
                <h1 className="text-4xl font-bold">ChaiMessages</h1>

                <section className="header--actions flex items-center gap-3">
                  <button
                    className="text-2xl text-white/50 hover:text-white"
                    onClick={() => onNotificationToggle?.(!areNotificationsEnabled)}
                  >
                    {areNotificationsEnabled ? <BellRing /> : <BellOff />}
                  </button>

                  <button className="text-2xl text-white/50 hover:text-white">
                    <Settings />
                  </button>
                </section>
              </Padded>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activity Bar */}
        <AnimatePresence>
          <div
            className={twMerge(
              "duration-[350ms] flex min-h-[3rem] w-full items-center px-5 text-white transition-all",
              isSearchInputFocused && "py-3",
            )}
            style={{
              backgroundColor: isSearchInputFocused ? ChaiColors.ACTIVITYBAR : undefined,
            }}
          >
            <Input
              placeholder="Search"
              className="flex-grow"
              onFocus={handleSearchInputFocus}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={<Search />}
              name="search"
            />

            <AnimatePresence>
              {isSearchInputFocused && (
                <motion.div
                  className="relative cursor-pointer"
                  style={{ color: ChaiColors.LINK }}
                  onClick={handleSearchInputBlur}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: "auto",
                    marginLeft: "0.7rem",
                    right: -3,
                    opacity: 1,
                  }}
                  exit={{ width: 0, marginLeft: "0rem", opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  Cancel
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatePresence>

        <AnimatePresence>
          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center" key="chats-loading">
              <SpinnerIcon className="size-6" variant="ios" />
            </div>
          )}

          {/* Chat */}
          <div className="mt-2 flex flex-col" key="chats-list">
            <AnimatePresence initial={true}>
              {filteredChat.map((chat, i) => (
                <Tapback
                  key={chat.id}
                  blur
                  blurClassName="bg-white/5"
                  className={twMerge(chat.id === tapbackChatID && "fixed left-0 right-0 top-4 mx-auto w-fit")}
                  menuClassName={"w-[250px]"}
                  onOpenChange={(isOpen) => void setTapbackChatID(isOpen ? chat.id : undefined)}
                  isOpen={chat.id === tapbackChatID}
                  actions={[
                    {
                      label: "Delete",
                      className: "text-red-500",
                      icon: <Trash className="size-5" />,
                      onPress: () => onChatDelete?.(chat.id),
                    },
                  ]}
                >
                  <AnimatePresence initial={false} key={"presence_chat_" + chat.id}>
                    {chat.id === tapbackChatID ? (
                      <motion.div
                        layoutId={"chat_list_item" + chat.id}
                        transition={{ type: "spring", stiffness: 260, damping: 27, duration: 0.4 }}
                        className="mx-auto mt-auto w-[90dvw] max-w-[600px] rounded-2xl bg-[#1C1C1E] shadow-2xl shadow-white/[2%]"
                      >
                        <iframe
                          id={"texting-iframe" + chat.id}
                          src={`/texting/${chat.id}?frameless=true`}
                          className="h-[calc(80dvh-50px)] w-full rounded-2xl border-none bg-transparent"
                          title="Openrizz Texting"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="overflow-hidden"
                        transition={{ type: "spring", stiffness: 260, damping: 27, duration: 0.4 }}
                        layoutId={"chat_list_item" + chat.id}
                      >
                        <ChatListItem chat={chat} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Tapback>
              ))}
            </AnimatePresence>
          </div>
        </AnimatePresence>
      </motion.main>
    );
  },
);
