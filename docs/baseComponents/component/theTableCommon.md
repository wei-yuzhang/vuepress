---
title: 公用表格--tableCommon
---

<returnHeader />

# 公用表格 tableCommon
公用表格主要功能有选择和排序展示表格列、分页、展示从表、表格头配置筛选、表格头配置排序、等功能。   

## 组件效果图
### 总体效果
+ 包括表格，分页和表格头选择框。
<br />

<imageView imageTitle="总体效果" imageUrl="/images/tableCommon/totalTable.png"/>

### 表格头选择框
+ 可选择展示主表表列
+ 可移动展示主表表格列的展示顺序
<br />
<br />
<imageView imageTitle="表格头选择框" imageUrl="/images/tableCommon/operating.png"/>

## Attributes
参数|说明|类型|默认值|是否必须
----|----|----|------|--------
tableInfo|查询表格数据对象|Object|—|是
columnInfo|表头数据对象|Object|—|是

### tableInfo对象的属性名说明
参数|说明|类型|是否必须|默认值
----|----|----|------|------
url|表格数据请求接口|String|是|无
headerUrl|表格头修改保存接口|String|是|无
tableParams|查询表格数据的请求参数|Object|是|无
has|操作按钮权限|—|Object|否|无
tableHeight|页面中减去表格高度以及分页之外的高度|Number|否|0
isIndex|是否展示序号<br/>strCode: String 按钮code标识|Boolen|是|无
isSelected|是否展示多选框|Boolen|是|无
isHeader|是否支持表格列操作功能|Boolen|是|无
isExpand|是否支持表格行展开从表事件|Boolen|是|无
operation|是否显示主表操作列<br/>isOperation: Boolen 是否显示操作列<br/>width: Number定义操作列宽度|Object|是|无
isShowPagination|是否展示分页|Boolen|是|无

### columnInfo对象的属性名说明
参数|说明|类型|是否必须|默认值
----|----|----|------|------
param|表格列参数对象<br/>isSortable：Boolen 是否支持默认排序<br/>width：Number 表格列宽度<br/>isFilters：Booleb 是否支持筛选<br/>filters：Array 列筛选选择条件<br/>filtersSlot：String 修改显示筛选条件出来的行数据（自行添加表格里slot属性）<br/>formatter：Function 表格格式化数据|Object|否|无

## Events
事件名称|说明|回调参数|是否必须
--------|----|--------|--------
rowDblClick|表格行双击触发|双击的表格行数据|否
TableCurrentChange|表格选中当前行触发|选中当前行数据|否
filterChange|表格筛选条件改变触发|选择的筛选条件|否
rowClick|表格行单击触发|单击的表格行数据|否
selectionChange|表格勾选表格行的复选框触发|选中的表格行数据|否
expandChange|展开不同表格行的从表数据|主表的表格行数据和主表展示的列|否
