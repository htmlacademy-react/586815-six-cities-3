import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewType, ReviewContentType } from '../../types/common';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { AppDispatch } from '../../types/state';

interface ReviewsProps {
  offerId?: string;
}

const fetchOfferReviews = createAsyncThunk<ReviewType[], ReviewsProps, {
  extra: AxiosInstance;
}>(
  'offers/one/reviews/all/fetch',
  async ({ offerId }, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

interface AddedReviewProps {
  body: ReviewContentType;
  offerId: string;
}

const sendReviewAction = createAsyncThunk<void, AddedReviewProps, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offers/one/reviews/one/add',
  async ({ body, offerId }, { dispatch, extra: api }) => {
    await api.post<ReviewContentType>(`${APIRoute.Comments}/${offerId}`, body);
    dispatch(fetchOfferReviews({ offerId }));
  },
);

export { fetchOfferReviews, sendReviewAction };
