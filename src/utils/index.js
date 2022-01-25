// 将富文本内容转成普通文本
export const formatHtmlToString = (html) => {
  const str = html.replace(/<\/?.+?>/g, '')
  return str.replace(/ /g, '')
}

// 提取富文本中的图片地址
export const getImgFromRichText = (html) => {
  const imgs = []
  html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
    imgs.push(capture)
  })
  return imgs
}
