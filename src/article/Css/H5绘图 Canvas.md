### H5绘图 Canvas

HTML5新增的专门用来绘制图形的元素，通过Canvas技术，用户可以在Web中绘制各种图形是一块无色透明的区域，只是一个容器，通过js脚本可以轻松在区域上实现任意绘制

#### 属性

> <font color="#24c438">id</font>            用于js查找
>
> <font color="#24c438">width/height</font>  宽高
>
> <font color="#24c438">innerHTML</font>     用于写入不支持的提示文本

#### 步骤

- HTML添加canvas元素，js通过id找到canvas

- 通过canvas元素的getcontext获取context（上下文），即创建context对象，以获取允许进行绘制的2d环境

  ```javascript
  <canvas id='canvas'></canvas>
  
  <script>
    let canvas = document.getElementById('canvas')
    // 使用js脚本进行绘制(操作context)
    let ctx = canvas.getContext('2d')
    //颜色
    ctx.fillStyle = 'rgba(0,255,111,0.2'
    //矩形大小
    ctx.fillRect(0, 0, 150, 75)
  </script>
  ```

#### context属性

> <font color="#24c438">lineWidth</font>    直线宽度
>
> <font color="#24c438">strokeStyle</font>  直线颜色
>
> <font color="#24c438">lineCap</font>      直线端点样式 butt、round、square、默认butt
>
> <font color="#24c438">lineJoin</font>     直线端点样式连接点样式 miter、round、bevel、默认miter

#### 直线

> <font color="#24c438">beginPath()</font>  定义一个新的路径绘制动作的开始(我要开始画了)
>
> <font color="#24c438">moveTo()</font>     为指定点创建一个新的子路径，这个点可以变成新的上下文点，可以看做用来定位绘图鼠标(开始点)
>
> <font color="#24c438">lineTo()</font>     以上下文为起点，到方法参数中指定的点之间画一条直线(结束点)
>
> <font color="#24c438">stroke()</font>     为所画的线赋予颜色，使其可见，如果没指定颜色，默认为黑色(我画上去了)

- ```javascript
  <canvas id='canvas'></canvas>
  
  <script>
    let canvas = document.getElementById('canvas')
    // 使用js脚本进行绘制(操作context)
    let ctx = canvas.getContext('2d')
    ctx.beginPath()
    //开始点
    ctx.moveTo(0, 0)
    //结束点
    ctx.lineTo(200, 100)
    //画上
    ctx.stroke()
  </script>
  ```

#### 弧线和曲线y

> <font color="#24c438">quadraticCurveTo</font>  制二次曲线，每条曲线有由上下文，一个控制点，一个终止点(中间点x,中间点y,x,y)
>
> <font color="#24c438">bezierCurveTo</font>     绘制曲线(中间点x1,中间点y1中间点x2,中间点y2 ,x,y)
>
> <font color="#24c438">arcTo</font>     	在画布上创建介于两个切线之间的弧线(x1,y1,x2,y2,弧度)

- ```javascript
  <canvas id='canvas'></canvas>
  
  <script>
    let canvas = document.getElementById('canvas')
    // 使用js脚本进行绘制(操作context)
    let ctx = canvas.getContext('2d')
  
    ctx.moveTo(10, 10)                //在左上方开始
    ctx.lineTo(90, 10)                //到达圆角开始点的水平线
    ctx.arcTo(100, 10, 100, 20, 10)   //圆角
    ctx.lineTo(100, 100)              //到达右下方的垂直线
    // //画上
    ctx.stroke()
  </script>
  ```

#### 圆

> <font color="#24c438">x,y</font> 		   描述弧的圆形的圆心的坐标。
>
> <font color="#24c438">radius</font> 		描述弧的圆形的半径。
>
> <font color="#24c438">startAngle, endAngle</font>   沿着圆指定弧的开始点和结束点的一个角度。这个角度用弧度来衡量，沿着 X 轴正半轴的三点钟方向的角度为 0，角度沿着逆时针方向而增加。
>
> <font color="#24c438">counterclockwise</font>       弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历。

- ```javascript
  <canvas id='canvas'></canvas>
  
  <script>
    let canvas = document.getElementById('canvas')
    // 使用js脚本进行绘制(操作context)
    let ctx = canvas.getContext('2d')
    // 绘制圆形
    ctx.beginPath()
    ctx.arc(
      200,  // 圆心x坐标（居中）
      200,  // 圆心y坐标（居中）
      100,  // 半径
      0,    // 起始角度（弧度）
      Math.PI * 2 // 结束角度（完整圆形）
    )
    ctx.strokeStyle = '#000' // 线条颜色
    ctx.lineWidth = 2        // 线条宽度
    ctx.stroke()
  </script>
  ```

#### 文本

> <font color="#24c438">font</font>          字体样式 normal,italic,bold  
>
> <font color="#24c438">fillStyle</font>     字体颜色
>
> <font color="#24c438">fillText()</font>    实心文字
>
> <font color="#24c438">strokeText()</font>  空心文字

- ```javascript
  <canvas id='canvas'></canvas>
  
  <script>
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
  
    // 必须设置 Canvas 的实际尺寸（重要！）
    canvas.width = 400
    canvas.height = 400
  
    // 绘制填充文字
    ctx.font = '30px Arial'
    ctx.fillStyle = 'black' // 设置文字颜色
    ctx.fillText('Hello World', 50, 100) // (x, y) 坐标
  
    // 如果需要描边文字（可选）
    ctx.strokeStyle = 'red' // 描边颜色
    ctx.lineWidth = 2       // 描边宽度
    ctx.strokeText('Hello World', 50, 200) // 描边文字
  </script>
  ```

#### 渐变

- 矩形渐变

```javascript
<canvas id='canvas'></canvas>

<script>
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // 设置Canvas尺寸
  canvas.width = 400
  canvas.height = 400

  // 渐变起止坐标
  const x1 = 100, y1 = 100  // 渐变起点
  const x2 = 500, y2 = 300  // 渐变终点

  // 创建线性渐变
  const grd = ctx.createLinearGradient(x1, y1, x2, y2)

  // 使用明亮鲜艳的色标
  grd.addColorStop(0, '#FF3E3E')    // 鲜艳红色
  grd.addColorStop(0.3, '#FF9F4F')  // 橙红色
  grd.addColorStop(0.6, '#FFEB3B')  // 亮黄色
  grd.addColorStop(1, '#FFFFFF')    // 白色

  // 绘制渐变矩形
  ctx.fillStyle = grd
  ctx.fillRect(50, 50, 500, 300)  // 填充区域应覆盖渐变范围

  // 可选：添加描边和文字标注
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 2
  ctx.strokeRect(50, 50, 500, 300)

  ctx.font = '20px Arial'
  ctx.fillStyle = '#000'
  ctx.fillText('明亮线性渐变示例', 220, 380)

</script>
```

- 圆形渐变

```javascript
<canvas id='canvas'></canvas>

<script>
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // 设置Canvas尺寸
  canvas.width = 400
  canvas.height = 400

  // 坐标参数
  let centerX = 200  // 渐变中心X
  let centerY = 200  // 渐变中心Y
  let innerRadius = 50  // 内圆半径
  let outerRadius = 200 // 外圆半径

  // 创建更明亮的径向渐变
  let grd = ctx.createRadialGradient(
    centerX, centerY, innerRadius,  // 内圆
    centerX, centerY, outerRadius   // 外圆
  )

  // 使用更鲜艳的颜色
  grd.addColorStop(0, '#FF5E5E')  // 明亮的红色
  grd.addColorStop(0.5, '#FFBD4F') // 明亮的橙色
  grd.addColorStop(1, '#FFFFFF')   // 白色

  // 填充渐变
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
  ctx.fill()

  // 可选：添加描边
  ctx.strokeStyle = '#FF5E5E'
  ctx.lineWidth = 3
  ctx.stroke()
</script>
```

#### 图片

```html
<style>
    #canvas {
        border: 1px solid #ddd;
        margin: 10px;
    }

    .controls {
        margin: 10px;
    }

    button {
        margin: 0 5px;
        padding: 5px 10px;
    }
</style>
<div class='controls'>
  <button id='btn-basic'>基本绘制</button>
  <button id='btn-pattern'>重复图案</button>
  <button id='btn-slice'>切片绘制</button>
  <button id='btn-filter'>灰度滤镜</button>
</div>
<canvas id='canvas'></canvas>

<script>
  // 上述JavaScript代码
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 600
  canvas.height = 400

  // 使用高质量图片URL（固定尺寸避免拉伸）
  const imgUrl = 'https://picsum.photos/600/400'

  // 方法1：基础绘制（等比例缩放）
  function drawBasic() {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // 解决跨域问题
    img.src = imgUrl

    img.onload = () => {
      // 等比例缩放至Canvas大小
      const ratio = Math.min(canvas.width / img.width, canvas.height / img.height)
      const width = img.width * ratio
      const height = img.height * ratio
      const x = (canvas.width - width) / 2
      const y = (canvas.height - height) / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, width, height)
    }

    img.onerror = () => console.error('图片加载失败')
  }

  // 方法2：创建重复图案
  function drawPattern() {
    const img = new Image()
    img.src = imgUrl

    img.onload = () => {
      const pattern = ctx.createPattern(img, 'repeat')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  // 方法3：图片切片绘制（9宫格示例）
  function drawSliced() {
    const img = new Image()
    img.src = imgUrl

    img.onload = () => {
      const sliceSize = 100 // 切片大小

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制9个切片
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.drawImage(
            img,
            i * (img.width / 3),  // sx
            j * (img.height / 3), // sy
            img.width / 3,        // sw
            img.height / 3,       // sh
            i * sliceSize,        // dx
            j * sliceSize,        // dy
            sliceSize,            // dw
            sliceSize             // dh
          )
        }
      }
    }
  }

  // 方法4：添加滤镜效果
  function drawWithFilter() {
    const img = new Image()
    img.src = imgUrl

    img.onload = () => {
      // 先绘制原始图片
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 添加灰度滤镜
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg     // R
        data[i + 1] = avg // G
        data[i + 2] = avg // B
        // Alpha通道保持不变
      }

      ctx.putImageData(imageData, 0, 0)
    }
  }

  // 执行基础绘制（默认）
  drawBasic()


  // 绑定按钮事件
  document.getElementById('btn-basic').addEventListener('click', drawBasic)
  document.getElementById('btn-pattern').addEventListener('click', drawPattern)
  document.getElementById('btn-slice').addEventListener('click', drawSliced)
  document.getElementById('btn-filter').addEventListener('click', drawWithFilter)
</script>
```

