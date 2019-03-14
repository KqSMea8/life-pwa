import { ICell } from "src/Feeds/MasonryFeeds";

export async function getFeedsData(pageIndex: number): Promise<ICell[]> {
  await new Promise(r => setTimeout(r, 100));
  return [1, 1, 1, 1, 1, 1].map((_, idx) => ({
    imageUrl: `/${idx + 1}.jpeg`,
    favour: true,
    // tslint:disable-next-line:no-bitwise
    favourReceivedCount: (Math.random() * 25130) & -1,
    isVideo: idx === 1,
    authorName: ['IBM', 'Microsoft', 'Tesla', 'Amazon', 'Nvidia', 'Apple'][idx],
    content: 'Os vários produtos muito úteis da Nivea Os vários produtos muito úteis da Nivea',
    ...[{
      imageHeight: 1109,
      imageWidth: 832,
    }, {
      imageHeight: 1280,
      imageWidth: 720,
    }, {
      imageHeight: 820,
      imageWidth: 820
    }, {
      imageHeight: 1080,
      imageWidth: 1080
    }, {
      imageHeight: 1345,
      imageWidth: 1080
    }, {
      imageHeight: 1080,
      imageWidth: 810
    }][idx]
  }));
}
