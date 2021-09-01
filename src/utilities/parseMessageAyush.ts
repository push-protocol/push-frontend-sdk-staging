/** an old file from the extension, currently obsolete, used for reference
 * @description Parse the contents of the markdown version of the notification body
 * @param message the notification body we wish to parse
 * @returns 
 */
const FormatBody = (message: String) => {
    const data = message.split("\\n")

    let formatedData = "";

    data.forEach((ele) => {
  
      const splitData = ele.replace(/\s+(?=[^[\]]*\])/g, "").split(" ")
      splitData.forEach(ele1 => {
  
        if (/\[([^:]+):([^\]]+)\]/i.test(ele1)) {
          if (/\[(d):([^\]]+)\]/i.test(ele1)) { //// default or primary gradient color
            // console.log("d", ele1.match(/\[(s):([^\]]+)\]/i))
            formatedData += `<span style="color:rgba(27.0, 150.0, 227.0, 1.0);font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ ele1.match(/\[(d):([^\]]+)\]/i)?.[2] }</span> `
          }
          if (/\[(t):([^\]]+)\]/i.test(ele1)) { //// third gradient color
            // console.log("t", ele1.match(/\[(s):([^\]]+)\]/i))
            formatedData += `<span style="color:rgba(103.0, 76.0, 159.0, 1.0);font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ ele1.match(/\[(t):([^\]]+)\]/i)?.[2] }</span> `
          }
          if (/\[(s):([^\]]+)\]/i.test(ele1)) {//// secondary gradient color
            // console.log("s", ele1.match(/\[(s):([^\]]+)\]/i))
            formatedData += `<span style="c
            ;font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ ele1.match(/\[(s):([^\]]+)\]/i)?.[2] }</span> `
          }
          if (/\[(b):([^\]]+)\]/i.test(ele1)) {//// bold
            // console.log("b", ele.match(/\[(s):([^\]]+)\]/i))
            formatedData += `<span style="font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ ele1.match(/\[(b):([^\]]+)\]/i)?.[2] }</span> `
          }
          if (/\[(i):([^\]]+)\]/i.test(ele1)) {//// italic
            // console.log("b", ele.match(/\[(s):([^\]]+)\]/i))
            formatedData += `<span style="font-style: 'italic':italic;font-family: Roboto;font-size: 12px;line-height: 14px;">${ ele1.match(/\[(i):([^\]]+)\]/i)?.[2] }</span> `
          }
          if(/\[(u):([^\]]+)\]/i.test(ele1)){// url
            formatedData += `<span style=" color:rgba(226.0, 8.0, 128.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ ele1.match(/\[(u):([^\]]+)\]/i)?.[2] }</span> `
          }
          if(/\[(ub):([^\]]+)\]/i.test(ele1)){// url
            formatedData += `<span style=" color:rgba(53.0, 197.0, 243.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ ele1.match(/\[(ub):([^\]]+)\]/i)?.[2] }</span> `
          }
          if(/\[(ut):([^\]]+)\]/i.test(ele1)){// url
            formatedData += `<span style=" color:rgba(103.0, 76.0, 159.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ ele1.match(/\[(ut):([^\]]+)\]/i)?.[2] }</span> `
          }
          if(/\[(up):([^\]]+)\]/i.test(ele1)){// url
            formatedData += `<span style=" color:rgba(226.0, 8.0, 128.0, 1.0);font-style:italic;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ ele1.match(/\[(up):([^\]]+)\]/i)?.[2] }</span> `
          }
          if(/\[(e):([^\]]+)\]/i.test(ele1)){// error
            formatedData += `<span style="color:rgba(237.0, 59.0, 72.0, 1.0);font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ ele1.match(/\[(e):([^\]]+)\]/i)?.[2] }</span> `
          }
          else
            if (!/\[([^:]+):([^\]]+)\]/i.test(ele1))
              formatedData += `<span style="font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1}</span> `
        }
        else
          formatedData += `<span style="font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1}</span> `
  
      })
  
      formatedData += "<br>"
    })
  
    return formatedData;
  }

export default FormatBody;