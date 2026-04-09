### 1. endpoint menus
- Buatkan sample payload dengan parent, parent_id, children, icon, url, order dan name

```json
{
  "name": "Sub Menu Name",
  "parent_id": "7fa2aeb5-430c-4235-905e-bb1234567890",
  "parent": "Parent Menu Name",
  "children": "{}",
  "icon": "LucideFolder",
  "url": "/parent-menu/sub-menu",
  "order": 1
}
```

- buatkan jg sample payload tanpa parent, parent_id children tpi ada icon, url order

```json
{
  "name": "Main Menu Name",
  "icon": "LucideHome",
  "url": "/main-menu",
  "order": 1
}
```
