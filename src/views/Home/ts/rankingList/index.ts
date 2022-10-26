
export interface Track {
	first: string;
	second: string;
}

export interface RootObject {
	subscribers: any[];
	subscribed?: any;
	creator?: any;
	artists?: any;
	tracks: Track[];
	updateFrequency: string;
	backgroundCoverId: number;
	backgroundCoverUrl?: any;
	titleImage: number;
	titleImageUrl?: any;
	englishTitle?: any;
	opRecommend: boolean;
	recommendInfo?: any;
	subscribedCount: number;
	cloudTrackCount: number;
	adType: number;
	trackNumberUpdateTime: number;
	userId: number;
	createTime: number;
	highQuality: boolean;
	specialType: number;
	newImported: boolean;
	trackCount: number;
	coverImgUrl: string;
	anonimous: boolean;
	updateTime: number;
	coverImgId: number;
	commentThreadId: string;
	totalDuration: number;
	trackUpdateTime: number;
	privacy: number;
	playCount: number;
	ordered: boolean;
	tags: any[];
	description: string;
	status: number;
	name: string;
	id: number;
	coverImgId_str: string;
	toplistType: string;
}