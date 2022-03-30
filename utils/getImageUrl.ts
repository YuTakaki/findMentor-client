import { userType } from "../types/types"

export const getImageUrl = (user: userType, previewImg : null | string | undefined = null,) => {
  return previewImg || (user.profile_img ? user.profile_img.startsWith('/media') ? 
  `${process.env.NEXT_PUBLIC_SERVER}${user.profile_img}` : `${user.profile_img}` : '/images/previewImg.png')
}