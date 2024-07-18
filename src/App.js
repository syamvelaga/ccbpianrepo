import {Component} from 'react'
import Navbar from './components/Navbar'
import EachTabItem from './components/EachTabItem'
import EachDishItem from './components/EachDishItem'
import './App.css'

//  write your code here
class App extends Component {
  state = {
    tableMenuList: [],
    activeTabItem: '',
    categoryDishes: [],
    cartCount: 0,
  }

  componentDidMount() {
    this.getItemsData()
  }

  getItemsData = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const formatedData = data.map(eachItem => ({
      branchName: eachItem.branch_name,
      nextUrl: eachItem.nexturl,
      restaurantId: eachItem.restaurant_id,
      restaurantImage: eachItem.restaurant_image,
      restaurantName: eachItem.restaurant_name,
      tableId: eachItem.table_id,
      tableMenuList: eachItem.table_menu_list,
      tableName: eachItem.table_name,
    }))
    // console.log(formatedData)
    const tabsList = formatedData[0].tableMenuList.map(eachItem => ({
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      categoryDishes: eachItem.category_dishes,
    }))
    this.setState({
      tableMenuList: tabsList,
      activeTabItem: tabsList[0].menuCategoryId,
      categoryDishes: tabsList[0].categoryDishes,
    })
  }

  alterTabItem = (id, categoryDishes) => {
    this.setState({activeTabItem: id, categoryDishes})
  }

  decreaseCartCount = () => {
    this.setState(prevState => ({cartCount: prevState.cartCount - 1}))
  }

  increaseCartCount = () => {
    this.setState(prevState => ({cartCount: prevState.cartCount + 1}))
  }

  render() {
    const {tableMenuList, activeTabItem, categoryDishes, cartCount} = this.state
    const formatedCategoryDishes = categoryDishes.map(eachDishItem => ({
      addOnCat: eachDishItem.addonCat,
      dishType: eachDishItem.dish_Type,
      dishAvailability: eachDishItem.dish_Availability,
      dishCalories: eachDishItem.dish_calories,
      dishCurrency: eachDishItem.dish_currency,
      dishDescription: eachDishItem.dish_description,
      dishId: eachDishItem.dish_id,
      dishImage: eachDishItem.dish_image,
      dishName: eachDishItem.dish_name,
      dishPrice: eachDishItem.dish_price,
    }))
    return (
      <>
        <Navbar cartCount={cartCount} />
        <ul className="tabsList">
          {tableMenuList.map(eachItem => (
            <EachTabItem
              key={eachItem.menuCategoryId}
              tabItem={eachItem}
              activeTab={activeTabItem === eachItem.menuCategoryId}
              changeTabItem={this.alterTabItem}
            />
          ))}
        </ul>
        <ul className="dishesList">
          {formatedCategoryDishes.map(eachDishItem => (
            <EachDishItem
              dishItem={eachDishItem}
              key={eachDishItem.dishId}
              decreaseCartCount={this.decreaseCartCount}
              increaseCartCount={this.increaseCartCount}
            />
          ))}
        </ul>
      </>
    )
  }
}

export default App
