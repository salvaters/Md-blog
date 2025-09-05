import useClipboard from 'vue-clipboard3'
import { nextTick } from 'vue'

// 复制
export const setCopyButtonClick = async () => {
  const { toClipboard } = useClipboard()
  await nextTick(() => {
    let copyButton: any = document.getElementsByClassName('copy-button')
    Array.from(copyButton).forEach((item: any) => {
      item.addEventListener('click', function(e: any) {
        let target = e.target
        let uid = target.attributes['prop-id'].value
        const firstElement: any = document.querySelector(`[prop-id='${uid}']`)
        const element = document.querySelectorAll(`[prop-id='${uid}']`)
        element.forEach(async (x: any) => {
          if (x.className === 'hljs') {
            try {
              await toClipboard(x.innerText)
              firstElement.innerText = '复制成功'
              let Timeout = setTimeout(() => {
                firstElement.innerText = '复制'
                clearTimeout(Timeout)
              }, 2000)
            } catch (err) {
              console.error('Failed to copy text: ', err)
            }
          }
        })
      })
    })
  })
}
