import React from 'react';
import { useImmerState } from 'src/hooks/immer';
import { ICoverData } from 'src/Feeds/MasonryFeeds';
import { Draft } from 'immer';

export interface IModel {
  feeds: {
    jp: { left: ICoverData[]; right: ICoverData[] };
    pt: { left: ICoverData[]; right: ICoverData[] };
    en: { left: ICoverData[]; right: ICoverData[] };
    jpHeight: number;
    ptHeight: number;
    enHieght: number;
    jpScrollTop: number;
    ptScrollTop: number;
    enScrollTop: number;
  };
}

const initialState: IModel = Object.freeze({
  feeds: {
    jp: { left: [], right: [] },
    pt: { left: [], right: [] },
    en: { left: [], right: [] },
    jpHeight: 0,
    ptHeight: 0,
    enHieght: 0,
    jpScrollTop: 0,
    ptScrollTop: 0,
    enScrollTop: 0
  }
});
export const StoreContext = React.createContext<{
  getState(): IModel;
  setState(s: (draft: Draft<IModel>) => void): void;
}>({} as any);

export const StoreProvider: React.SFC<{}> = props => {
  const [store, setState] = useImmerState<IModel>(initialState);
  (window as any)._store_ = {
    getState() {
      return store;
    },
    setState
  };

  return (
    <StoreContext.Provider value={(window as any)._store_}>
      {props.children}
    </StoreContext.Provider>
  );
};
