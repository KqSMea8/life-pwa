import jpData from './jp.json';

export interface ICell {
  VideoInfos?: null | VideoInfo[];
  ImageInfos?: null | ImageInfo[];
  Title: string;
  Content: string;
  Author: string;
  Avatar?: null | ImageInfo;
  UpVote?: number;
  Url: string;
}

export interface VideoInfo {
  Height: number;
  Width: number;
  Url: string;
  OriUrl: string;
  PosterUrl: string;
}

export interface ImageInfo {
  Height: number;
  Width: number;
  Url: string;
  OriUrl: string;
}

export async function getFeedsData(
  pageIndex: number,
  pageSize = 8
): Promise<ICell[]> {
  await new Promise(r => setTimeout(r, 300));
  const rtn: ICell[] = [];
  const startIndex = (pageIndex - 1) * pageSize;
  for (let i = 0; i < pageSize; i++) {
    const d = jpData[(startIndex + i) % Math.min(pageSize, jpData.length)];
    if (!d.VideoInfos && !d.ImageInfos || !d.Author) {
      continue;
    }
    rtn.push(d);
  }
  return rtn;
  // return [1, 1, 1, 1, 1, 1].map((_, idx) => ({
  //   imageUrl: `/${idx + 1}.jpeg`,
  //   favour: true,
  //   // tslint:disable-next-line:no-bitwise
  //   favourReceivedCount: (Math.random() * 25130) & -1,
  //   isVideo: idx === 1,
  //   authorName: ['IBM', 'Microsoft', 'Tesla', 'Amazon', 'Nvidia', 'Apple'][idx],
  //   content: 'Os vários produtos muito úteis da Nivea Os vários produtos muito úteis da Nivea',
  //   ...[{
  //     imageHeight: 1109,
  //     imageWidth: 832,
  //   }, {
  //     imageHeight: 1280,
  //     imageWidth: 720,
  //   }, {
  //     imageHeight: 820,
  //     imageWidth: 820
  //   }, {
  //     imageHeight: 1080,
  //     imageWidth: 1080
  //   }, {
  //     imageHeight: 1345,
  //     imageWidth: 1080
  //   }, {
  //     imageHeight: 1080,
  //     imageWidth: 810
  //   }][idx]
  // }));
}
