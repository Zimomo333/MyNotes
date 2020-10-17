1. ### 列表外键自动请求

   ```javascript
   //PostList中含有外键userId，自动关联users表
   export const PostList = props => (
       <List {...props}>
           <Datagrid rowClick="edit">
               <ReferenceField source="userId" reference="users">
   				<TextField source="name" />
               </ReferenceField>
               <TextField source="id" />
               <TextField source="title" />
               <TextField source="body" />
           </Datagrid>
       </List>
   );
   ```

   **Tip**: `<Reference>`只负责拉取数据，并传递给子组件

   The `<ReferenceField>` component alone doesn’t display anything. It just fetches the reference data, and passes it as a `record` to its child component (a `<TextField>` in our case). Just like the `<List>` component, all `<Reference>` components are only responsible for fetching and preparing data, and delegate rendering to their children.

   **Tip**: 每行都有外键，自动去重、聚合成尽可能少的HTTP请求

   Look at the network tab of your browser again: react-admin deduplicates requests for users, and aggregates them in order to make only *one* HTTP request to the `/users` endpoint for the whole Datagrid. That’s one of many optimizations that keep the UI fast and responsive.
   
   
   
2. ### ReferenceInput

   `ReferenceInput`会调用`dataProvider`的`getManyReference`接口

   拉取关联表的所有项

   As it’s a `<ReferenceInput>`, it’s already populated with possible users.
   
   ```javascript
   export const PostEdit = props => (
       <Edit {...props}>
           <SimpleForm>
               <TextInput disabled source="id" />
               <ReferenceInput source="userId" reference="users">
                   <SelectInput source="name" />
               </ReferenceInput>
               <TextInput source="title" />
               <TextInput multiline source="body" />
           </SimpleForm>
       </Edit>
	);
   ```
   
   ![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/react/react-admin/reference_fetchAll.PNG)

