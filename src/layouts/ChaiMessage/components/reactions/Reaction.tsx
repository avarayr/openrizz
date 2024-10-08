import { motion } from "framer-motion";
import React from "react";

const Heart = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg
      width="60"
      height="53"
      viewBox="0 0 60 53"
      fill="none"
      {...props}
      initial={{ scale: 0, opacity: 0, y: 40, rotateX: 180 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        ease: [0, 0, 0, 1.3],
        duration: 0.6,
        delay: props.transition?.delay,
      }}
      style={{ transformOrigin: "bottom left" }}
    >
      <path
        d="M9.91188 2.48352C10.7904 2.15602 11.9594 1.69902 12.5094 1.46802C15.1749 0.350021 22.0774 1.54702 24.6734 3.57702C25.7824 4.44452 27.7444 6.51902 29.1344 8.29452L30.2594 9.73102L31.3844 8.29452C36.6144 1.61502 42.5099 -0.485977 49.1804 1.95202C52.0229 2.99102 52.6109 3.37352 55.0569 5.77402C62.0754 12.663 61.0174 25.8345 52.7569 34.4115C51.7929 35.412 50.4504 37.0185 49.7734 37.981C48.2369 40.1655 47.9214 40.479 45.7594 41.9735C44.7969 42.639 43.6719 43.5425 43.2594 43.981C42.8469 44.4195 41.7219 45.327 40.7594 45.9975C39.7969 46.668 38.6129 47.5575 38.1284 47.974C36.4844 49.387 31.0824 52.481 30.2594 52.481C29.4364 52.481 24.0344 49.387 22.3904 47.974C21.9059 47.5575 20.7309 46.6645 19.7789 45.99C12.6719 40.9505 2.85338 29.372 1.96338 24.981C1.82388 24.2935 1.47388 22.9295 1.18538 21.9495C0.261878 18.8125 1.30388 11.271 3.02638 8.62652C4.44738 6.44502 8.15138 3.14052 9.91188 2.48352Z"
        fill="currentColor"
      />
    </motion.svg>
  );
});

const ThumbsUp = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg
      width="63"
      height="61"
      viewBox="0 0 63 61"
      fill="none"
      {...props}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ rotate: [0, -35, 0], scale: [1.05, 1], opacity: 1 }}
      transition={{
        ease: [0, 0, 0, 1.15],
        duration: 0.6,
        delay: props.transition?.delay,
      }}
      style={{ transformOrigin: "bottom left" }}
    >
      <path
        d="M32.34 9.0465C33.997 4.382 35.305 1.9305 36.6335 0.999997C38.0685 -0.00500339 39.0085 0.0114968 40.5425 1.069C44.6295 3.8855 44.956 10.4395 41.5305 20.8825C40.1455 25.106 40.2405 25.19 45.779 24.624C56.35 23.5435 57.8565 23.556 59.9685 24.743C62.966 26.4275 63.4585 27.7435 62.1215 30.495C61.216 32.3585 61.029 33.6195 61.0285 37.8555C61.0285 42.8935 61.001 43.011 59.1395 46.038C58.1005 47.727 56.7215 50.3145 56.0745 51.788C55.4275 53.2615 54.676 54.952 54.4045 55.545C52.9385 58.7435 46.955 60.406 37.029 60.372C20.1245 60.314 16.73 58.2415 15.8885 47.467C14.9245 35.1185 15.2795 33.8805 21.557 27.6895C25.011 24.283 28.844 18.5755 30.305 14.6635C30.756 13.4555 31.672 10.928 32.34 9.0465Z"
        fill="currentColor"
      />
      <path
        d="M2 52.138C-0.6775 44.812 1.22101 35.69 6.02901 32.78C8.20651 31.462 10.1095 31.425 11.244 32.6785C12.148 33.6775 12.148 34.2725 11.241 43.6855C11.0705 45.456 11.1595 47.706 11.4385 48.6855C13.792 56.94 13.7945 57.653 11.476 58.916C8.13451 60.7355 4.0835 57.838 2 52.138Z"
        fill="currentColor"
      />
    </motion.svg>
  );
});

const ThumbsDown = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg
      width="62"
      height="61"
      viewBox="0 0 62 61"
      fill="none"
      {...props}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ rotate: [0, -35, 0], scale: [1.05, 1], opacity: 1 }}
      transition={{
        ease: [0, 0, 0, 1.15],
        duration: 0.6,
        delay: props.transition?.delay,
      }}
      style={{ transformOrigin: "bottom right" }}
    >
      <path
        d="M19.0094 0.980522C20.1094 0.972522 21.3469 0.739022 21.7594 0.462022C23.6869 -0.833478 39.0974 1.27902 42.1139 3.25202C46.2619 5.96452 47.2029 8.68002 47.5959 19.066C47.8719 26.358 47.1929 27.944 41.1499 34.115C36.9784 38.3755 34.4909 42.635 30.8629 51.731C27.6044 59.9015 26.8934 60.981 24.7729 60.981C21.6834 60.981 18.2004 55.2 18.9719 51.3525C19.1509 50.4605 19.4994 48.7185 19.7469 47.481C20.5399 43.5135 21.1089 41.281 21.8714 39.1445C22.8229 36.4785 22.3919 35.7325 20.1899 36.2335C17.0589 36.9455 2.74235 37.089 1.93185 36.4165C0.0523529 34.8565 -0.329138 33.114 0.747862 31.0035C1.53436 29.462 1.75937 28.0505 1.75937 24.6615C1.75937 19.469 2.24788 17.9025 5.38138 13.042C6.68938 11.013 7.75937 9.01852 7.75937 8.61002C7.75937 4.99802 13.6239 1.02102 19.0094 0.980522Z"
        fill="currentColor"
      />
      <path
        d="M50.8149 8.98102C49.6309 4.66502 49.5989 3.98752 50.5274 2.96152C55.2164 -2.22048 61.7604 5.69852 61.7574 16.551C61.7549 26.0265 59.8004 29.134 54.0094 28.8685L51.0094 28.731L51.1614 25.731C51.5354 18.349 51.3849 11.0575 50.8149 8.98102Z"
        fill="currentColor"
      />
    </motion.svg>
  );
});

const Haha = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg width="70" height="70" viewBox="0 0 70 70" fill="none" {...props}>
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.1939 1.73602C22.4699 2.12902 21.7154 2.85152 21.5164 3.34102C20.4234 6.03352 20.0754 7.58852 19.8064 10.981L19.5094 14.731H17.2594H15.0094L14.6949 12.481C13.4169 3.34252 8.18485 -0.849479 3.68435 3.65902C-1.59015 8.94252 0.572856 35.685 6.49286 38.3825C11.5774 40.699 14.9814 37.2185 15.6879 28.981L16.0094 25.231H18.2594H20.5094L20.8479 27.481C22.2244 36.634 25.0283 39.6595 30.0258 37.3825C34.8308 35.193 36.4168 12.9695 32.3308 5.08652C30.4373 1.43452 26.4439 -0.0299793 23.1939 1.73602ZM47.8154 3.22702C45.2144 5.06452 43.6539 7.73452 38.8199 18.6195C37.9549 20.567 37.7594 21.99 37.7594 26.334C37.7594 29.263 37.4919 32.399 37.1654 33.3025C35.4969 37.9165 40.6108 37.922 44.9188 33.3105L46.3809 31.745L51.1954 31.885C55.7289 32.0165 56.0764 32.1035 57.1639 33.378C60.1829 36.9165 60.2834 36.981 62.7439 36.981C69.6524 36.981 69.5159 32.252 62.0229 11.981C58.9064 3.55052 52.7374 -0.250478 47.8154 3.22702ZM53.1789 17.7545C53.4984 18.455 53.7629 19.5235 53.7669 20.1295C53.7714 20.7355 53.9754 21.548 54.2209 21.9355C55.0774 23.2885 54.2399 23.981 51.7474 23.981C48.8104 23.981 48.6894 23.685 49.9859 19.665C51.1039 16.1975 52.1769 15.555 53.1789 17.7545Z"
        fill="currentColor"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          ease: [0, 0, 0, 1.6],
          duration: 0.6,
          delay: props.transition?.delay,
        }}
      />

      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.7594 41.051C43.0334 44.5405 39.7329 52.9045 39.1194 65.481C38.9459 69.0375 43.3453 69.01 45.4528 65.442C46.2908 64.0235 46.4314 63.981 50.2624 63.981H54.2084L55.6089 65.856C60.0819 71.8445 65.5264 68.243 63.3029 60.7665C62.7414 58.88 60.9344 53.477 59.8984 50.59C57.0084 42.534 52.5669 38.731 48.7594 41.051ZM26.5809 42.7595C24.9144 44.426 24.7929 44.7655 24.6559 48.1345L24.5094 51.731H22.7664C21.4059 51.731 20.9904 51.5115 20.8739 50.731C19.3279 40.349 11.7089 38.3745 10.7544 48.108C9.46236 61.287 13.1819 71.8565 18.1989 69.2625C20.0124 68.3245 20.3309 67.565 21.6694 60.9865C22.2394 58.186 25.7459 58.7825 25.7669 61.6835C25.8199 69.0525 32.8809 71.249 35.0969 64.586C35.8399 62.353 35.7829 50.372 35.0099 46.3505C34.0929 41.5785 29.6534 39.687 26.5809 42.7595ZM52.2154 54.7655C52.9994 57.4205 52.5924 58.1405 50.4454 57.895C48.7594 57.7025 48.3269 56.233 49.2789 53.9335C50.1909 51.7325 51.4234 52.082 52.2154 54.7655Z"
        fill="currentColor"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          ease: [0, 0, 0, 1.6],
          duration: 0.6,
          delay: (props.transition?.delay ?? 0) + 0.1,
        }}
      />
    </motion.svg>
  );
});

const Exclamation = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg width="47" height="68" viewBox="0 0 47 68" fill="none" {...props}>
      <motion.path
        d="M1.82187 15.981C2.95087 14.1145 3.63237 13.576 6.00937 12.671C11.2654 10.671 17.0484 13.4005 18.0174 18.339C19.3884 25.327 17.7829 42.8155 15.4394 46.4175C11.1829 52.9585 7.88537 48.268 1.22287 26.1955C0.344375 23.285 0.659874 17.9015 1.82187 15.981ZM15.6344 67.231C8.38287 69.675 3.37535 58.944 9.90885 54.961C14.5443 52.134 19.7594 55.044 19.7594 60.457C19.7594 64.034 18.3749 66.3075 15.6344 67.231Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0, rotateX: 180, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        transition={{
          ease: [0, 0, 0, 1.35],
          duration: 0.6,
          delay: props.transition?.delay,
        }}
        style={{ transformOrigin: "bottom left" }}
      />

      <motion.path
        d="M26.6408 28.731C25.0808 11.73 26.2729 3.62102 30.7094 1.04802C31.9864 0.307021 33.3809 0.00302072 35.5094 2.07159e-05C47.8634 -0.0164793 49.5059 9.82302 40.7644 31.481C40.1539 32.9935 39.3779 34.9705 39.0399 35.875C34.9139 46.9135 27.9403 42.896 26.6408 28.731ZM35.3064 62.2065C26.5014 66.76 19.6184 55.633 27.2029 49.1065C28.7009 47.8175 34.3439 47.506 35.8209 48.6305C39.9914 51.8055 39.6829 59.9435 35.3064 62.2065Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0, rotateX: 180, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        transition={{
          ease: [0, 0, 0, 1.2],
          duration: 0.6,
          delay: (props.transition?.delay ?? 0) + 0.1,
        }}
        style={{ transformOrigin: "bottom left" }}
      />
    </motion.svg>
  );
});

const Question = React.memo((props: React.ComponentProps<typeof motion.svg>) => {
  return (
    <motion.svg width="38" height="68" viewBox="0 0 38 68" fill="none" {...props}>
      <motion.path
        d="M15.5024 0.973522C16.3314 0.969023 17.3469 0.739021 17.7594 0.461521C18.1719 0.184021 19.0719 0.0890213 19.7594 0.250021C20.4469 0.411021 22.0219 0.731523 23.2594 0.962523C38.6549 3.83402 42.1484 24.797 28.7594 33.9685C25.6749 36.081 23.7594 38.326 23.7574 39.831C23.7499 45.6715 16.7224 48.344 12.4939 44.1155C9.44988 41.0715 11.2124 28.981 14.7004 28.981C14.9004 28.981 15.9359 28.1825 17.0019 27.206C18.0674 26.23 19.5179 25.089 20.2244 24.671C24.7724 21.9795 25.9094 15.6185 22.1869 13.6935C17.6434 11.344 12.5514 15.573 11.7724 22.343C11.5239 24.4995 4.75887 24.3805 2.55937 22.181C-3.54613 16.0755 5.64036 1.02352 15.5024 0.973522Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0, rotateX: 180, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        transition={{
          ease: [0, 0, 0, 1.2],
          duration: 0.6,
          delay: props.transition?.delay ?? 0,
        }}
        style={{ transformOrigin: "bottom left" }}
      />
      <motion.path
        d="M16.7414 67.981C8.57837 67.981 6.47638 57.4515 13.7594 53.044C17.1919 50.9665 20.9359 52.466 23.7209 57.0335C26.3544 61.3535 22.1289 67.981 16.7414 67.981Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0, rotateX: 180, y: 100 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        transition={{
          ease: [0, 0, 0, 1.2],
          duration: 0.6,
          delay: (props.transition?.delay ?? 0) + 0.1,
        }}
        style={{ transformOrigin: "bottom left" }}
      />
    </motion.svg>
  );
});

export const Reaction = {
  ThumbsUp,
  ThumbsDown,
  Heart,
  Exclamation,
  Question,
  Haha,
};
