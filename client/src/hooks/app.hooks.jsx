import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useApp} from '../providers/App.provider.jsx';

export function useAdminGetAllOrdersFromAllUsers({enabled = true} = {}) {
  return useSendRequest({
    key: ['get-all-users-order-history'],
    method: 'GET',
    path: '/admin/all-orders',
    enabled,
  });
}

export function useAdminGetAllOrdersCountPerDay({enabled = true} = {}) {
  return useSendRequest({
    key: ['get-order-count-per-day'],
    method: 'GET',
    path: '/admin/all-orders-count-per-day',
    enabled,
  });
}

export function useGetOwnOrderHistory({enabled = true} = {}) {
  return useSendRequest({
    key: ['get-order-history'],
    method: 'GET',
    path: '/cart/order-history',
    enabled,
  });
}

export function useOrderCurrentCart({enabled = true} = {}) {
  return useSendRequest({
    key: ['make-order'],
    method: 'POST',
    path: '/cart/order',
    enabled,
  });
}

export function useGetItemsSearch(searchQuery, {enabled = true} = {}) {
  return useSendRequest({
    key: ['search-items', searchQuery],
    method: 'GET',
    path: `/items/search?searchQuery=${searchQuery}`,
    enabled,
  });
}

export function useGetItem(itemId, {enabled = true} = {}) {
  return useSendRequest({
    key: ['get-item'],
    method: 'GET',
    path: `/items/get?itemId=${itemId}`,
    enabled,
  });
}

export function useGetItemsInCart({enabled = true} = {}) {
  return useSendRequest({
    key: ['get-items-in-cart'],
    method: 'GET',
    path: '/cart/list',
    enabled,
  });
}

export function useAddItemToCart(itemId, {enabled = true} = {}) {
  return useSendRequest({
    key: ['add-item-to-cart'],
    method: 'POST',
    path: `/cart/add?itemId=${itemId}`,
    enabled,
  });
}

export function useRemoveItemFromCart(itemId, {enabled = true} = {}) {
  return useSendRequest({
    key: ['remove-item-from-cart'],
    method: 'POST',
    path: `/cart/remove?itemId=${itemId}`,
    enabled,
  });
}

export function useIsItemInCart(itemId, {enabled = true} = {}) {
  return useSendRequest({
    key: ['is-item-in-cart'],
    method: 'GET',
    path: `/cart/check?itemId=${itemId}`,
    enabled,
  });
}

export function useItemImageUrl(item) {
  const {config} = useApp();
  return `${config.host}/${item._id}/img.png`;
}

// Send an authorized request to the server.
// Returns a query result object created by react-query.
function useSendRequest({key, method, path, enabled}) {
  const {config, user} = useApp();

  const url = config.host + path;

  return useQuery({
    queryKey: key,
    enabled: enabled,
    async queryFn({signal}) {
      const res = await axios(url, {
        headers: {
          'auth': user.accessToken,
        },
        signal,
        method,
      });
      return res.data;
    },
  });
}
