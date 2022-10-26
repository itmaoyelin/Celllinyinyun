

export interface Artist {
	img1v1Id: number;
	topicPerson: number;
	followed: boolean;
	alias: string[]|any[];
	picId: number;
	musicSize: number;
	albumSize: number;
	briefDesc: string;
	picUrl: string;
	img1v1Url: string;
	trans: string;
	name: string;
	id: number;
	picId_str: string;
	img1v1Id_str: string;
}

export interface RootObject {
	songs: any[];
	paid: boolean;
	onSale: boolean;
	mark: number;
	awardTags?: any;
	companyId: number;
	alias: any[];
	artists: Artist[];
	copyrightId: number;
	artist: Artist;
	picId: number;
	briefDesc: string;
	publishTime: number;
	company: string;
	picUrl: string;
	commentThreadId: string;
	pic: number;
	blurPicUrl: string;
	description: string;
	tags: string;
	status: number;
	subType: string;
	name: string;
	id: number;
	type: string;
	size: number;
	picId_str: string;
	isSub: boolean;
}