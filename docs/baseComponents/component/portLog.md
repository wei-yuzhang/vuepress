---
title: 接口日志--portLog
---

<returnHeader />

# 接口日志 portLog
用户查看接口日志的报文，数据异常等情况

## 组件效果图
### 总体效果
+ 包括查询，高级检索，表格，分页，弹出对话框
<br />

<imageView imageTitle="总体效果" imageUrl="/images/port-log/port-log-1.png"/>

### 搜索和高级检索
<br />
<imageView imageTitle="搜索和高级检索" imageUrl="/images/port-log/port-log-2.png"/>

+ 查询部分：通过 slot 插口方式，***slot="filter"***
+ 按钮部分：“查询” 按钮组件内生成
+ 查询方法：***handleSubmit（查询）***
```html{1}
  <template slot="filter">
    <!-- 查询条件 -->
    ...
    ...
  </template>
```
+ 高级检索部分：***slot="advanced-search"*** ，检索条件用户通过 el-form 自定义
+ 按钮部分：“取消”、“重置”、“查询” 组件内生成
+ 取消方法：组件处理（隐藏高级检索框）
+ 重置方法：***handleReset（重置）***
```html{1}
  <template slot="advanced-search">
    <el-form>
      <el-form-item>
        <!-- 高级检索条件 -->
        ...
        ...
      </el-form-item>
    </el-form>
  </template>
```
### 表格分页
<br />
<imageView imageTitle="表格分页" imageUrl="/images/port-log/port-log-3.png"/>

+ 表格表头，标题内容自定义，操作栏固定三个按钮（报文，数据异常，重新发送）。同时三个按钮的字体图标可以进行自定义，默认 icon-message、icon-abnormal、icon-resend
+ 报文方法：***handleDetailRow***
+ 数据异常：***handleAbnormalRow***
+ 重新发送：***handleResendRow***
+ 分页方法：***handleCurrentPageChange*** 
+ 每页条数变化：***handleSizeChange***

### 报文对话框
<br />
<imageView imageTitle="报文" imageUrl="/images/port-log/port-log-4.png"/>

### 数据异常
<br />
<imageView imageTitle="数据异常" imageUrl="/images/port-log/port-log-5.png"/>
<br />
<br />


## Attributes
参数|说明|类型|默认值|是否必须
----|----|----|------|--------
formData|查询表单数据对象|Object|—|是
columns|表头数据对象<br/> label：显示的标题<br/> prop：对应列内容的字段名<br/> minWidth：对应列的最小宽度<br/> sortable：对应列是否可以排序<br/> formatter：用来格式化内容|Object|—|是
tableData|表格数据|Array|—|是
tableLoading|表格加载状态|Boolean|false|是
iconData|操作列字体图标<br/> message: 报文<br/> bnormal：数据异常<br/> resend：重新发送|Object|'icon-message'<br/> 'icon-abnormal',<br/> 'icon-resend'<br/>|是
paginationSize|是否使用小型分页样式|Boolean|true|否
currentNumber|当前页码|Number|1|是
pageSizes|每页条数|Number|10|是
pageSizeType|条数选择|Array|[10, 15, 20, 25]|否
total|总条数|Number|0|是
dialogDataInfo|对话框报文部分|Object|—|是
dialogDataAbnormal|对话框数据异常部分|Array|—|是

## Events
事件名称|说明|回调参数|是否必须
--------|----|--------|--------
handleSubmit|主界面点击查询时触发|—|是
handleReset|高级检索中点击重置按钮时触发|—|是
handleDetailRow|表格操作列点击报文按钮时触发|scope（点击行数据）|是
handleAbnormalRow|表格操作列点击数据异常按钮时触发|scope（点击行数据）|是
handleResendRow|表格操作列点击重新发送按钮时触发|scope（点击行数据）|是
handleSizeChange|分页中每页显示条数变化时触发|size（每页条数）|是
handleCurrentPageChange|分页中当前页码变化时触发|currentNumber（当前页码）|是
