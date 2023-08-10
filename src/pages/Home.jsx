import React, { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/Sceleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSortOrder,
  setSortType,
} from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sortType, sortOrder, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [pizzasCollection, setPizzasCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchName } = useContext(SearchContext);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickSortOrder = () => {
    dispatch(setSortOrder());
  };

  const onClickSort = (obj) => {
    dispatch(setSortType(obj));
  };

  // если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // если был первый рендер сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sortType,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = async () => {
    let category = categoryId ? `${categoryId}` : '';
    setIsLoading(true);
    window.scrollTo(0, 0);
    let sortOrderValue = sortOrder ? 'asc' : 'desc';
    try {
      const res = await axios.get(
        `https://64c3ebe167cfdca3b6607977.mockapi.io/photocollec?page=${currentPage}&limit=4&category=${category}&sortBy=${sortType.sortProperty}&order=${sortOrderValue}`,
      );
      setPizzasCollection(res.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  //тут короч просто фетчим пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, sortOrder, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort
          value={sortType}
          onClickSort={onClickSort}
          sortOrder={sortOrder}
          onClickSortOrder={onClickSortOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
          : pizzasCollection
              .filter((obj) => obj.title.toLowerCase().includes(searchName.toLowerCase()))
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
