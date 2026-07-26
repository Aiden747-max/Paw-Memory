import { 
  PetState, 
  PostItem, 
  TimelineItem, 
  MediaVaultItem, 
  DailyTask, 
  ShopItem 
} from '../types';

export const APP_ICON = "https://lh3.googleusercontent.com/aida-public/AB6AXuD-1xTZPMltA5saWtdDirhntTZ9Hq7CoY4xzz0ijDhJsPaLHEHoi9RAY776N6K05Hu6r4KkdoTxDao0oZz3W2hxSqbsoJWJODluRYTlxWLdD4XXQ6XD02ideoW2nHr-nd6IghBOP-en_MpJVQeGHYEDVYYiN2hbU92Woz9SfxQ8m8HsZLr-lIMe_d-Sy0aBNwRPtUlubl9vj_2BxI_D8miG-uQ1JsLLI2WCzToOvBOsS4tGdw2OeRTB";

export const initialPetState: PetState = {
  name: "毛毛",
  gender: "male",
  uid: "20210214",
  fullness: 85,
  mood: 92,
  companionDays: 1126,
  remembranceDays: 236,
  coins: 1240,
  starlightCount: 1420,
  memoriesCount: 128,
};

export const IMAGES = {
  appIcon: APP_ICON,
  heroKitten: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7dOA4AiqkeAbj-fyJgmBFjVlNR3V_EbT-FRxCB4fUKb8wIJAEjPjfaXPCmsB4_v8cgrAuqmVkRSDpa66YbutOgRA_vclun4GDSD7dNbJZ6MmxocE8QYGdHoX_bks8lsXpOJfLoAflPINsmC34z30fjlG7ZUgdlVDjL7-CkzMjnp7YToXbhxVu4N9d4fEXHM06R3UCwZgFt0PjgDyPIHbx8kk1uWF95YeiRi3Cr_EEHbJ7V3VkzkJo",
  maomaoAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHjEyLzF983LPNXkYWwk6MWRTegjNSmtyPbX5OSKD0Donw7m9a79ynoSQ4aNfAnSX9IGvxF_Vab1p2MXjEL6tKx2ukVQpGf9jykH4miNhZcf2rQFEUAWQQJlz5uGwx5jxljM8uOEqDtcaIAgpYUx96c6fJHXcN5ju3wNo_kng9YCoWrLUDxypH5BMPW7NehuU8gvm21te0YTXdF2WJl1jq5c1i3S0ud_8Au1hDZXiBAkBWujYkxOB6",
  greenParkCat: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmN3xs5Eir-L3YfxIzIbJ5yoPdoHvV0KMyZjVH3kowcu94GAzBphzp7H03_m8ifOxzcriZBiar1jbkH_TdpbqqM48ZLphdLY8zAU4w1njtc3McOTgGCLXiu82JCo4xEbu9Ef5l2NVZrg7M40u4UbViEZUG20DtRGZ8sLHzUxTbh90IdDGrB3WIPXut8eAhvSCBBzcm0sVbVQ_ucEByXhk4yMjTWqJnf-yvTiXxJAta-wPo00y3gzFB",
  naitangAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQtW0Canpkfymewt_NkCAJGs14j8SucAzztTrICDL5EqzCAgSIWC7bUxPLKb7D-xSRe6TrglpR-N7VnD1AC6RZDg6uCip59A41xcKXWKKigTjY0E03a0qQKZLxlwOxQlCw34NyD_mutD8fTDoMb3qKf72-XJGoG6nw4Jlxy9vEVHElI5iuiTCtkHxkIwllTX8qaiSHt87ln5e4jLHQSpd753COPE61pcsQlgdiHpzHemEIicSEJ0Yl",
  gameMascot: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPod2yVdbcQIwqdrnFKPF0G_Ii0W18ZZ8wP0S33UtTPKfFOd9hrkTJ9SztS-bgUFNxSt3InsSnac-hiuxYihkVXDX95-bHkoIOrD4O56fyxKATMhUccTSgYtdfacZnhPAVUAz-MC2hj9Rtv6W1cAkTzjjjzNt7OnPnzC2aZKrLe75Ir3mVHHe8LL7BzEJdtlpQdAih96dZhq7YGq9NlkAEfPBQ9Ns-u1i7AOYUWT1Qq8wYF5U4Z6W",
  goldFish: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXf-gAcWCasd0J9QTUyEcIFsRa0MvMOFwG7yXYrMhCIcPRDcsFvz-_iDElrPtImer74uYMfbpwIMRNKhKz_XUDISJFwK5-r7aMFsjE_9zJ4NHbiUqk3uUeHMWC-vXrIX42wEB7iOmrfl6e4nlEnYwinM0Js_aPA6Bq3a_r2CJ7DSrN6AiPgFo-F1PnTTXXnocInVYUXGbKB4sDE5AEU6vj6HC_CWvR3HcaDst0mUjBZ5OLGlu5tU0A",
  yarnBall: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6XH5LAxY5hA2Swv6yB_wmFr28cOgREJsJKGgdZbsxAWTLBJxTd32YijW3mM7aBDigPuIAyHIZkHeAXOS90NLU76TGj41DjiCNwRva-Um04RBouo0XD_b1_2IvIOgSeJODQaaEw-xygFj2xKlUO2cP_odBuo8eb5BCTObQu0Lt8BAg_QYyhqwiaWG_67LT5s1GE8t3yNcjijWmv43B5u8eB79z_z0G7Ho4t6ij1-NmfcvhqmD1-Ve",
  pawTrophy: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc_JZVhigYB7Yq1N9qcrtKEAkXqVCZBBhnnAC0bx4yC8uczsmEo9D71yeYEIXPKPlPUaVl6ulaOTV3cCbNSrBO-HWr6o4lmuK55PJdKBnf_7p1NgAZzWmthldk6LVlDd2UC1xy4w1ud00tBeMlMJ4WhixLcwEcZtmT9nmN3NVdxt43uugiZOk-3rl5VtkdX7hQT3s5obRU5ZzAnrK2k3nO43eg8BmM0rWbU7prEJiAlZTbPg0tPBuX",
  portraitKitten: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRi89sfH-kWech3OG_Onf3so6MGVi-qVTKVqqGP6i8-fEn4V2XNjIkhsXAWs86MGDMBUngKo_Wnb4Y-2vjbT_zSKKR9WMyDhXHAE7pb4ZMD5zKXC7g5HCCjbwluqtoF2dZ_b1q9IhPWxM_ih9_Qy96szmvc4Shq6KqhmowWXs9tc9M2OavpA64EUguxWZ1aBWAgZZUFJdz7fHggG-Z8ee7NHWAj5Cn1F_59Vja5Kv3ngge1P0tb5XI",
  gallerySleepingCat: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJYjBEe0r2OafKYHiDySACKUiAc4gKXvXCf1QKeODf1XwOSpMsOT1OfM4WflJq67geSiWGc91PGpiQHyYCEdGRX2m_e9Bn8EKiMLso4ZxTlu5V6auD_IObgBu0a8QbOonaJqNJxUkrWvdw9-MHJi8QhyYctq36xKPiiJ7yB_7rhpg3FVTpYHQ6Ai3eyBeJjsE1wcEOSgwIDoH4J7CSUBfWcbxpiA-xcJTfn6r5uLScXPyn84E-NX34",
  galleryPaw: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJtj2ABe5R5mJFFqYxEXyERc-hxpQSutYHLfBH6o1Zoly7p1INYLw_AzBajtK8UCoEUemT8SYvJckhIHmi-4jT9o4RqwzwQRxxfn9OCOQcZk5p967m1CUP728IPoCGXvSbHAyVkEs5uUm8yZpi3BTbpWG50Yz4N1u01AoOy6sUzYCbwMvhRFtrBFcUTkX_N9Z7GBBXv6vGbhpjuka7MLWDsjOVHSpUNxDsVIsDHeuM466K95q2Lks",
  galleryTabbyKitten: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhWIEFercRN62EUrDu0rOECbXcqI0j0SE66eoiYXE7cWDPrGGVRpxZPPu0uKvrS36kfb7p3UeU6XjkfNrYdnPmwC4lSFBTV5b2LlEcyvFjdmuCp3PyYUw8D0iXaIuGIjNAwO4ZuP0d6sVT8Bykgpuf6zP2tiaJox_Zfg9jtZXLO_wOw5wpK7LKxsiZl3Y2x-d_7e8LKmJeMlm2OzEa5RQRyrUtrcqFTjhxHJG3CsakUOYNLIBOYPBl",
  samoyedStars: "https://lh3.googleusercontent.com/aida-public/AB6AXuAguJUF4xY1aJ4ZXPD8N3drFDASbtCN-N5q5vieK49YM6L-8bXf3MVPGOxpoCBMf3u_i_mTy_Bbd2E1fKPTY641ygXeRabEbqgUTo9u17YXzaO8W-or-b-pM8EWgNjGI8l4fdqcoL2Q5wrhI1y7LgXoiVr2i5S9xDOeoYZBP-rsey6cuFq6FHVhfZ5m6jGRvA9kiSqT4PASRxcAXIdWw8ibJAEwUEfROegzMO-uIjAroR4LRZo6_AcY",
  profileAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFymLkKJXldKutie7Ws5XddbwGFErBxr9Y3GZIdUjMMpycshhXeD1EWN0jFH_GzoaVGu9H5bOwMrfLu_ymL9gQU4N7tdWvBRiO0RZz3KPyV6jqEr08LnYwKRVBvZa9qqcLcqi7eJcSmZTg48QUEebeL942vPFphx3nSJfO4C7zH3hcKRDyXHxEee6__EQK2NT0qHbzplOFws5LiD2S1cyk5JdLukq3D7uxMnwXCzQOgsW47AdWSRF9",
  bathCat: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj4p-DO5-TMdWYajitsWy4ZkVRBbYUtgUiEQiqhwh9PzfD5srzAe3xoxSsrKzv9FW7DV-Effqpro5Jj-skf2IkyIyElk67IB83-x_bQkFxZKeLBoGRQ85lVToPE0TvDrfnFCnQP2VIiXnnBnXjZs1hn32ZqY-fJo_yN135TqcnIXJbWg452CQW-85cZcB4g1uQMcslGawoE1x1k9zCMtOKkwBN4lWyQTRBUT2fPpe38weruqd5Ttkp",
  etherealAiCat: "https://lh3.googleusercontent.com/aida-public/AB6AXuApw0_Nu3jbYLojm-9w5-HtqWiJFa_agHg2jASqxK-3bdlr6egecwU3LKwCuH5rbMRjIKwA_vJS21s33RyZNXZitdjUP75PZZl-lhmvigVizlOscEyF_cXrrgXzLUHpdr-f-tB0EDvbfkCCb5XMm9Bx34uUhVITHUC4iwhBs4ygSk5M4yff7-zYDsArr8TlcsnHXR2-9wCisGIDPC2rE-RANFuy7pkth1uY0Y7EKzwfC9gyvOLTPEyV",
  treeholeAvatars: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDeXsaWmH4E5v25cIxk4VHB944atKgfDG5U3G75seoHQ1nwv1NdUjuTex_dprVY-niKMGNRmQKjX1UvCgB2GxEjbZbzwqqnQapRq2xEyttPVu1rFbM5RkSE9mRCibe81JV13WNV2AAyKhObk5-KLDNAl3M_wSv_Ko9uZn0H9fV9f_2LVSUCC592T6HXjXLDZZLDYm6FlDxVt3Umly-EFJR6RJivH1FexsxmItCJos9jA8SKj38gR51N",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBo60E-iLT8uVgg4Pbir6tnrhC2bndBMQ_Z-W3YDuleoXPoGxhxSOskeS0d06xnZXmDxs22kElcR4Am5cw3k3B3ZfbskhCrsNHSuV6m5sYRfwdvvxlEtfVSnZ5dFvs3Hyms9oW25uZVLoZOtXOz-jZyM0At87RzZiWcOONb-NGOIRMkp6ei1fEBAwfBTcpjsxgpS4H1MIRmTm1Wnt1YZBV418-LkqNGwzHfAOgg-u-Zo0zcWC1GJPyG",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrwCqNirnNATiMLIDZQb88Mmwdk2xjGtsFRx0IkQdFQGlzYYb5T5uiXTWT3F1u-WWCkclP9o-3HBlGJPizYaOOOrCIT_DsOkmVWtFbcXBQ4eLw27qyeaLef7bLQz1FiKbC-7FqJvqyPtkPlzrW0gRqU0SPxOEErA-cRBHdMVLbvg23hHu6TBcr19T1EW4G1UHzdnbDAqI_oXQlvpeIUVBQE9qSTi3_wpaGKk8sFpblZfEJfcS9I5Ej",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_m7d_vpZp28_SR840qDSY4kz_xKhrkzj3ht5lhNboFidi7pbNmT8jqVgLacL6-ZmQ-WnzqIPiW39t1EAiUsUudYwHnA5lK9p6yZ2Pl3qzSuNNdsPzwCYOjmszLyRnLSFe_ERrNZKjVf7LRDHo5i_CFkTAknySWqpMJBzzR8p5GNyOQHxzqg4GW9dUs1iqgET5XZOMdvM6UE4CkUEfReI2XwHcgCTHXKkHLNFeIRwcR7CtZohb7mC5",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCqJ_gTxCsgm1dgqRsVCqPhLINAObgs3A6shoAIZzKOVieI4Z6o-6hIsaM5n-RXOKz35RQnXXP_Hfj-8WWTpVDYlj6hKW_iZL0E28Tlg6DxRgX_S2nOjiPVOtQO6fIMnQ1AANZrNoQYRHVvRMyr-XUnfTIkexdQ_HWW6hARKsYO4tepWlQs1rAPn8Y7cxTrfIJtno2pv4UeFea6cY-RY-o0fNPjJJcD2Lu12_Kvtvy0hxkXfDtmQXI0"
  ],
  vaultGrid: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQuAml0MZrK0jBNqtAMq2tjT-zJq7yK5GVaDgm3YGqnAKOSpc-zx8GVg6AAa-ycjJGf1bi-iQeccbl2oP48pbxuNgWfOTbFcf1FEtYutEf2LuVAGPoCXn7rHQ5V4kry5y3w-Hue_PB6X5jQCbhIh5QuEDCMR1Fu_wV_VjBT5bcjzryk27uUcVHIIB7U05n8-ToUXqYcfxnHJy-DbkxvNO3amUEM98ba84bq7wVwqTYGUVLqu10G2gi",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAccDO8RCDna8XsFMgnS85MbN1aKM3ae5exLOxm0oMCmn98h4EDJT2iGAGfWEOJHowfR_Klsta0M-Ec5og18nmHyLS9RL2YHGtkoTLEQcT9yQcp84VwmUGNaucVqYk751RJGSWlUPg1EOv3Oy7t574GjwvcJ37JKeC1Xba_g8r7HP6OpFvn3cGAWHVOhyO3WhR9ihjTmBOsjjsIqcn_ZP7b2wi7Qcu6TgF5Q0vz_A9faUGFSqZUklKB",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAmZszNH9dNQAfDljaUPCtw2WKvGI9cwGUT10Cy-b1jHqHrWsXZf9x_jnW087GETOxu6-UAGKEVKJczixKWz9yJ_iDu7gdGDnxW9Fpxmv91kHyCeg52QfVf0J7fKZIvjd49bginrbDThJ6p2hi5elShILezx09-yj_qnmHNp1pzPfD8QultjUhW6IKaX0JrVfPDrpcjHcx5bERu2iX4yfYMhzdmUFA4EU-8l45jZvNybxvTaElCL8mc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD7qRYrqegaVOF2D7XJw1P60V4fdzaAyigvptzEgooNiYWsmvjqg4ntfBpYu9SGzgiz7yAZAyutb6Wq6pLQ2rlIvKTM70JEFFBuZJC1dzjiQFKIC95BakFpgR3QOxMjCxhvtL4Pp4kFewYs2trRJM6MeLX8czF4m1T2Xkk45It3ruEHn_WOHciq9yQsR1AFfS66h0EcnIP-jbS-91B8Ps2BH7dzsYAxrSEUZSNHcDjVHoMvOjZp11cS",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1o5tq9RY8DpVqdDdFNVdnk2ETVKFX6doQKU-VIxGKS5BZqQVs06fo43ImYLPzVQOHxwvE-okrhNwb3a4EvTIAiyiGByraf_YRkGbSQhBWKlh0s3KU8OXZcqXtP00-P1h0657h4-Ury4pMgvKSuvNbhIJM3lY8Ycj4sKNSTpNSPUIAjzUqzdko_LmRLK5ZxAy97lQCFBtE9j5_7LPZqRkorMM22HK898HXz0g14U2bg4MOPgQc90QP",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgvWLidOyHVhyusMnvltLZz0bJWaAijZHMRLK8pDQ_kxakJtiEdTr2RbOvZT_P3r9Mnqjz6u8T6QNxIbRxJX9ZcpwLczrO-gOqBGcr2ZC5zyKNh9wYd6oqXzIgB6zC0YFROQy2Stnmer5uwXZtYAlDiKCPkuipyO42TFsUKu6N0sRzYzrosHB4ljjDkKkOp34G1P5XJIbnILmkOJV4SVDFdlV6phtot1M9evozlW9m6t17-h5hzCdj",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCGaYurVkj3PdZawXD9XacMO-Fcc2PyNmrl7QMtG_f4YXFm07c_2uzRWjpF5xzIzImVJewlF7zJKFDJ2PsWNBSZTm4RL1I0hXf3xi_6EdxYJM0LPAfxXpYtNqLq1p8X-J3FxCdtPGCv8ECfUi8aP4YEnafE-8RnHfczv3j-7DBvf7wYSGk4iwaVQkVFXPopUE9-y71Apnhyk0OYGPeiMbUQv713yNe6gbJwjNbAnRVvSjSu3rwKhGsL",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBpJPw6CVC67-L7TrbszKjOtJYX5YsAAaGyMWTexkFDL-m9h7GN1nzqa8f7bqIYYyHtN6wxft2iRMORD8XqJf4eIpkxExvXZkWCxdGdtofVFW68CMi6G2A8AxRVTDrjOocsM0WHnA5KY-7l3qjXXwK53Xc47nLgOzTn_FtoYUuwHKULZ-qSQNHBIoE36tXJsMf4bOWEt4nI01ZDWEq_BG_5hUCFaX5z22eG-ePMxOObNM920ek_etoG",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCH7hPgPe5mVPQdJMTZ60JbxcisX2VUHBJLjFCpMcoyIiA1Zi2SYmgfEE5xCwFh10g84_DJm-WXGUiEsXF9v5ZiBcK-tQU_AxlrUcCVaxuzqOyy8cr7vtv8sHpMfn6-a7y3yBA_0OT27vtpnujjUCtyx0umcNTXAi3dHL_4hC-bhaAvqyMohS2SDui7ch7E8xHkRCBVa5pMXxBID7pmAk4CXzrwvPxc8Os59Z981F5LjRN5KnjvqZ9D"
  ]
};

export const defaultPosts: PostItem[] = [
  {
    id: 'post-1',
    author: '毛毛',
    avatar: IMAGES.maomaoAvatar,
    time: '2小时前',
    content: '今天天气真好！主人带我去公园踏青，遇到了好多小伙伴~ 🌸🍃',
    image: IMAGES.greenParkCat,
    location: '青草公园',
    likes: 128,
    userLiked: false,
    commentsList: [
      { id: 'c1', author: '奶糖', avatar: IMAGES.naitangAvatar, content: '毛毛你今天好美啊！青草公园的草地看起来好软~', time: '1小时前' },
      { id: 'c2', author: '星空旅人', avatar: IMAGES.treeholeAvatars[0], content: '看到这么开心的毛毛，心情一下子变好了！', time: '40分钟前' }
    ]
  },
  {
    id: 'post-2',
    author: '奶糖',
    avatar: IMAGES.naitangAvatar,
    time: '4小时前',
    content: '新买的小窝到了，软绵绵的像云朵一样，真的太舒服啦！大家也快去看看吧...',
    likes: 56,
    userLiked: false,
    commentsList: [
      { id: 'c3', author: '毛毛', avatar: IMAGES.maomaoAvatar, content: '我也想要软绵绵的云朵小窝！喵~', time: '3小时前' }
    ]
  }
];

export const defaultTimeline: TimelineItem[] = [
  {
    id: 't-1',
    date: '2021.02.14',
    title: '我们相遇的日子',
    description: '在花鸟市场第一次见到你，小小的、软软的一团。',
    icon: 'favorite'
  },
  {
    id: 't-2',
    date: '2021.08.30',
    title: '第一次洗澡',
    image: IMAGES.bathCat,
    icon: 'bathtub'
  },
  {
    id: 't-3',
    date: '2022.04.10',
    title: '第一次外出',
    icon: 'forest'
  },
  {
    id: 't-4',
    date: '2023.06.01',
    title: '学会了握手',
    icon: 'front_hand'
  },
  {
    id: 't-5',
    date: '2024.01.30',
    title: '一起来到的第3年',
    tags: ['# 三周年', '# 家人'],
    icon: 'cake'
  }
];

export const defaultVaultItems: MediaVaultItem[] = [
  {
    id: 'v-1',
    type: 'photo',
    url: IMAGES.vaultGrid[0],
    caption: '睡在星光里的小天使',
    altText: 'Sleeping cat in starlight',
    date: '2024.05.12'
  },
  {
    id: 'v-2',
    type: 'video',
    url: IMAGES.vaultGrid[1],
    caption: '追逐星空蝴蝶的梦幻时刻',
    altText: 'Kitten chasing starlight butterfly',
    date: '2024.05.10'
  },
  {
    id: 'v-3',
    type: 'photo',
    url: IMAGES.vaultGrid[2],
    caption: '窗台上的月光凝视',
    altText: 'Cat looking at crescent moon',
    date: '2024.05.08'
  },
  {
    id: 'v-4',
    type: 'photo',
    url: IMAGES.vaultGrid[3],
    caption: '拥抱温暖星毯',
    altText: 'Cats cuddling under starry blanket',
    date: '2024.05.05'
  },
  {
    id: 'v-5',
    type: 'video',
    url: IMAGES.vaultGrid[4],
    caption: '触碰幸福的小爪爪',
    altText: 'Paw reaching for star charm',
    date: '2024.04.28'
  },
  {
    id: 'v-6',
    type: 'photo',
    url: IMAGES.vaultGrid[5],
    caption: '夜空下的提灯冒险',
    altText: 'Ginger cat with floating lantern',
    date: '2024.04.20'
  },
  {
    id: 'v-7',
    type: 'photo',
    url: IMAGES.vaultGrid[6],
    caption: '静谧之月的剪影',
    altText: 'Cat silhouette under moon',
    date: '2024.04.15'
  },
  {
    id: 'v-8',
    type: 'photo',
    url: IMAGES.vaultGrid[7],
    caption: '星光花园里的捉迷藏',
    altText: 'Cat in glowing flower garden',
    date: '2024.04.01'
  },
  {
    id: 'v-9',
    type: 'video',
    url: IMAGES.vaultGrid[8],
    caption: '跨越星河的敏捷一跃',
    altText: 'Cat leaping across starlight stream',
    date: '2024.03.25'
  }
];

export const defaultDailyTasks: DailyTask[] = [
  { id: 'dt-1', title: '完成一次喂食与抚摸', reward: 50, completed: true, progress: 1, maxProgress: 1, icon: 'restaurant' },
  { id: 'dt-2', title: '在游戏星完成1局挑战', reward: 80, completed: false, progress: 0, maxProgress: 1, icon: 'sports_esports' },
  { id: 'dt-3', title: '与毛毛在 AI 倾听进行1次对话', reward: 60, completed: false, progress: 0, maxProgress: 1, icon: 'chat' },
  { id: 'dt-4', title: '在怀念旅程点亮一次思念星光', reward: 100, completed: true, progress: 1, maxProgress: 1, icon: 'auto_awesome' }
];

export const defaultShopItems: ShopItem[] = [
  { id: 's-1', name: '美味小金鱼干', price: 100, icon: 'phishing', image: IMAGES.goldFish, category: 'food' },
  { id: 's-2', name: '彩虹毛线球', price: 150, icon: 'sports_tennis', image: IMAGES.yarnBall, category: 'toy' },
  { id: 's-3', name: '天蓝色针织围巾', price: 300, icon: 'stuructural', image: IMAGES.heroKitten, category: 'outfit' },
  { id: 's-4', name: '星空流光猫窝', price: 500, icon: 'bedtime', category: 'decor' }
];
