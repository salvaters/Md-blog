<template>
  <div class='LeftMenuPage'>
    <GlowBorder :border-radius='10' :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" />

    <!-- logo -->
    <div class='top-log'>
      <div class='img'><img alt='' src='../../../assets/images/user.jpg'></div>
      <div
        class='name'>
        salvater
      </div>
    </div>

    <!-- search -->
    <div class='search-div'>
      <div class='NeonBorder-main'>
        <NeonBorder animationType='full' class='NeonBorder'>
          <a-input v-model:value='searchName' class='input-search size-full' placeholder='站内搜索'>
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </NeonBorder>
      </div>
    </div>

    <!-- nav -->
    <navPage />
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import NeonBorder from '@/components/motion/NeonBorder/index.vue'
import GlowBorder from '@/components/motion/GlowBorder/index.vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import navPage from './nav/index.vue'

let searchName = ref('')
</script>


<style lang='less'>

.LeftMenuPage {
  height: calc(100% - 20px);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(1px);
  border-radius: 10px;
  overflow: hidden;
  margin: var(--layoutMargin);
  width: var(--navWidth);
  padding: 20px;
  //box-shadow: 0 0 5px #ff9966,
  //0 0px 5px #ff5e62,
  //0 0px 5px #6a11cb;

  //box-shadow: 0 0 5px rgba(249, 202, 191, 1);


  .top-log {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    margin-bottom: 15px;

    .img {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      overflow: hidden;
      margin-right: 8px;
      filter: drop-shadow(0 0 5px rgba(249, 202, 191, 1));

      img {
        width: 100%;
      }
    }

    .name {
      font-size: 22px;
      font-weight: bold;

    }
  }

  .search-div {
    user-select: none;
    position: relative;


    .NeonBorder-main {
      position: relative;

      .NeonBorder {
        border-radius: 100px;

        .input-search {
          border-radius: 100px;
          overflow: hidden;
          background: linear-gradient(var(--left-menu-search-attr-1), var(--left-menu-search-attr-2));

          .ant-input {
            background: rgba(0, 0, 0, 0);
          }
        }
      }
    }
  }
}
</style>
