import './index.css'

const EachTabItem = props => {
  const {tabItem, activeTab, changeTabItem} = props
  const {menuCategory, menuCategoryId, categoryDishes} = tabItem
  const isActive = activeTab ? 'active' : ''

  const tabItemChange = () => {
    changeTabItem(menuCategoryId, categoryDishes)
  }

  return (
    <li className={isActive} onClick={tabItemChange}>
      <h3>{menuCategory}</h3>
    </li>
  )
}

export default EachTabItem
