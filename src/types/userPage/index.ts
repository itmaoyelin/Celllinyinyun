
export interface singers {
	info: string;
	id: number;
	name: string;
	trans?: any;
	alias: string[];
	albumSize: number;
	mvSize: number;
	picId: number;
	picUrl: string;
	img1v1Url: string;
}

export interface Creator {
	userId: number;
	userName: string;
}

export interface mvs {
	type: number;
	title: string;
	durationms: number;
	creator: Creator[];
	playTime: number;
	coverUrl: string;
	vid: string;
	aliaName: string;
	transName: string;
	alg?: any;
	markTypes?: any;
}
export interface Dj {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	avatarImgId_str: string;
}

export interface djSublists {
	dj: Dj;
	category: string;
	secondCategory: string;
	buyed: boolean;
	price: number;
	originalPrice: number;
	discountPrice?: any;
	purchaseCount: number;
	lastProgramName: string;
	videos?: any;
	finished: boolean;
	underShelf: boolean;
	liveInfo?: any;
	playCount: number;
	privacy: boolean;
	icon?: any;
	manualTagsDTO?: any;
	descPicList?: any;
	intervenePicId: number;
	shortName?: any;
	picUrl: string;
	intervenePicUrl: string;
	categoryId: number;
	taskId: number;
	createTime: number;
	programCount: number;
	picId: number;
	subCount: number;
	lastProgramId: number;
	feeScope: number;
	lastProgramCreateTime: number;
	radioFeeType: number;
	dynamic: boolean;
	name: string;
	id: number;
	desc: string;
	rcmdtext: string;
	newProgramCount: number;
}
export interface Creator {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	avatarImgId_str: string;
}

export interface SheetList {
	subscribers: any[];
	subscribed: boolean;
	creator: Creator;
	artists?: any;
	tracks?: any;
	updateFrequency?: any;
	backgroundCoverId: number;
	backgroundCoverUrl?: any;
	titleImage: number;
	titleImageUrl?: any;
	englishTitle?: any;
	opRecommend: boolean;
	recommendInfo?: any;
	subscribedCount: number;
	cloudTrackCount: number;
	userId: number;
	totalDuration: number;
	coverImgId: number;
	privacy: number;
	trackUpdateTime: number;
	trackCount: number;
	updateTime: number;
	commentThreadId: string;
	coverImgUrl: string;
	specialType: number;
	anonimous: boolean;
	createTime: number;
	highQuality: boolean;
	newImported: boolean;
	trackNumberUpdateTime: number;
	playCount: number;
	adType: number;
	description?: any;
	tags: any[];
	ordered: boolean;
	status: number;
	name: string;
	id: number;
	coverImgId_str: string;
	sharedUsers?: any;
	shareStatus?: any;
	copied: boolean;
}
export interface UserPoint {
	userId: number;
	balance: number;
	updateTime: number;
	version: number;
	status: number;
	blockBalance: number;
}

export interface PrivacyItemUnlimit {
	area: boolean;
	college: boolean;
	age: boolean;
	villageAge: boolean;
}

export interface Expert {}

export interface Profile {
	privacyItemUnlimit: PrivacyItemUnlimit;
	avatarDetail?: any;
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	description: string;
	avatarImgId: number;
	birthday: number;
	gender: number;
	nickname: string;
	vipType: number;
	userType: number;
	createTime: number;
	avatarUrl: string;
	followed: boolean;
	authStatus: number;
	detailDescription: string;
	experts: Expert;
	expertTags?: any;
	djStatus: number;
	accountStatus: number;
	province: number;
	city: number;
	defaultAvatar: boolean;
	backgroundImgId: number;
	backgroundUrl: string;
	userId: number;
	mutual: boolean;
	remarkName?: any;
	signature: string;
	authority: number;
	followeds: number;
	follows: number;
	blacklist: boolean;
	eventCount: number;
	allSubscribedCount: number;
	playlistBeSubscribedCount: number;
	avatarImgId_str: string;
	followTime?: any;
	followMe: boolean;
	artistIdentity: any[];
	cCount: number;
	inBlacklist: boolean;
	sDJPCount: number;
	playlistCount: number;
	sCount: number;
	newFollows: number;
}

export interface Binding {
	expired: boolean;
	url: string;
	expiresIn: number;
	refreshTime: number;
	bindingTime: number;
	tokenJsonStr?: any;
	userId: number;
	id: number;
	type: number;
}

export interface ProfileVillageInfo {
	title: string;
	imageUrl?: any;
	targetUrl: string;
}

export interface useDetails {
	level: number;
	listenSongs: number;
	userPoint: UserPoint;
	mobileSign: boolean;
	pcSign: boolean;
	profile: Profile;
	peopleCanSeeMyPlayRecord: boolean;
	bindings: Binding[];
	adValid: boolean;
	code: number;
	createTime: number;
	createDays: number;
	profileVillageInfo: ProfileVillageInfo;
}