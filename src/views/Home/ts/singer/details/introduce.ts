export interface Introduction {
	ti: string;
	txt: string;
}

export interface Content {
	type: number;
	id: number;
	content: string;
}

export interface Topic {
	id: number;
	addTime: number;
	mainTitle: string;
	title: string;
	content: Content[];
	userId: number;
	cover: number;
	headPic: number;
	shareContent: string;
	wxTitle: string;
	showComment: boolean;
	status: number;
	seriesId: number;
	pubTime: number;
	readCount: number;
	tags: string[];
	pubImmidiatly: boolean;
	auditor: string;
	auditTime: number;
	auditStatus: number;
	startText: string;
	delReason: string;
	showRelated: boolean;
	fromBackend: boolean;
	rectanglePic: number;
	updateTime: number;
	reward: boolean;
	summary: string;
	memo?: any;
	adInfo: string;
	categoryId: number;
	hotScore: number;
	recomdTitle: string;
	recomdContent: string;
	number: number;
}

export interface Expert {
	1: string;
}

export interface Creator {
	userId: number;
	userType: number;
	nickname: string;
	avatarImgId: number;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundUrl: string;
	signature: string;
	createTime: number;
	userName: string;
	accountType: number;
	shortUserName: string;
	birthday: number;
	authority: number;
	gender: number;
	accountStatus: number;
	province: number;
	city: number;
	authStatus: number;
	description: string;
	detailDescription: string;
	defaultAvatar: boolean;
	expertTags: string[];
	experts: Expert;
	djStatus: number;
	locationStatus: number;
	vipType: number;
	followed: boolean;
	mutual: boolean;
	authenticated: boolean;
	lastLoginTime: number;
	lastLoginIP: string;
	remarkName?: any;
	viptypeVersion: number;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
}

export interface TopicData {
	topic: Topic;
	creator: Creator;
	shareCount: number;
	commentCount: number;
	likedCount: number;
	liked: boolean;
	rewardCount: number;
	rewardMoney: number;
	relatedResource?: any;
	rectanglePicUrl: string;
	coverUrl: string;
	categoryId: number;
	categoryName: string;
	commentThreadId: string;
	mainTitle: string;
	tags: string[];
	readCount: number;
	url: string;
	title: string;
	reward: boolean;
	shareContent: string;
	wxTitle: string;
	addTime: number;
	seriesId: number;
	showComment: boolean;
	showRelated: boolean;
	memo?: any;
	summary: string;
	recmdTitle: string;
	recmdContent: string;
	id: number;
	number: number;
}

export interface RootObject {
	introduction: Introduction[];
	briefDesc: string;
	count: number;
	topicData: TopicData[];
	code: number;
}