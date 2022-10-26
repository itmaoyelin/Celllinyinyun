export interface CommentThread {
	id: string;
	resourceInfo?: any;
	resourceType: number;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	hotCount: number;
	latestLikedUsers?: any;
	resourceTitle?: any;
	resourceId: number;
	resourceOwnerId: number;
	extProperties?: any;
	xInfo?: any;
}

export interface Info {
	commentThread: CommentThread;
	latestLikedUsers?: any;
	liked: boolean;
	comments?: any;
	resourceType: number;
	resourceId: number;
	commentCount: number;
	shareCount: number;
	likedCount: number;
	threadId: string;
}

export interface AnonymityInfo {
	anonymous: number;
	name?: any;
	avatarUrl?: any;
	me: number;
}

export interface PointTopicInfo {
	id?: any;
	type?: any;
	subType?: any;
	name?: any;
	icon?: any;
	desc?: any;
	target?: any;
	throughInfo?: any;
	ext?: any;
	parent?: any;
}

export interface User {
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
	backgroundImgIdStr: string;
	avatarImgIdStr: string;
	anchor: boolean;
	urlAnalyze: boolean;
	vipRights?: any;
	avatarImgId_str: string;
	commonIdentity?: any;
	followeds: number;
}

export interface ExtParam {}

export interface PointTopicInfo {
	id?: any;
	type?: any;
	subType?: any;
	name?: any;
	icon?: any;
	target?: any;
	h5Target?: any;
	throughInfo?: any;
	ext?: any;
	parent?: any;
}

export interface AnonymityInfo {
	anonymous: number;
	name?: any;
	avatarUrl?: any;
}

export interface ExtJsonInfo {
	actId: number;
	actIds: any[];
	uuid: string;
	extType: string;
	extSource?: any;
	extId: string;
	circleId: string;
	circlePubType?: any;
	extParams: ExtParam;
	tailMark?: any;
	privacySetting: number;
	typeDesc?: any;
	questionId?: any;
	voiceInfo?: any;
	pointTopicInfo: PointTopicInfo;
	activityInfos: any[];
	anonymityInfo: AnonymityInfo;
	titleAlias?: any;
}

export interface CommentThread {
	id: string;
	resourceInfo?: any;
	resourceType: number;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	hotCount: number;
	latestLikedUsers?: any;
	resourceTitle?: any;
	resourceId: number;
	resourceOwnerId: number;
	extProperties?: any;
	xInfo?: any;
}

export interface Info {
	commentThread: CommentThread;
	latestLikedUsers?: any;
	liked: boolean;
	comments?: any;
	resourceType: number;
	resourceId: number;
	commentCount: number;
	shareCount: number;
	likedCount: number;
	threadId: string;
}

export interface XInfo {
	topEvent: boolean;
	insiteForwardCount: number;
	info: Info;
}

export interface events {
	actName?: any;
	pendantData?: any;
	forwardCount: number;
	lotteryEventData?: any;
	discussId: string;
	insiteForwardCount: number;
	info: Info;
	topEvent: boolean;
	tailMark?: any;
	typeDesc?: any;
	alterLinkUrl?: any;
	alterLinkWebviewUrl?: any;
	privacySetting: number;
	question?: any;
	voice?: any;
	topActivityInfos?: any;
	bottomActivityInfos?: any;
	h5Target?: any;
	more: boolean;
	logInfo?: any;
	eventActionToast?: any;
	relationTopic?: any;
	extType: string;
	extSource?: any;
	anonymityInfo: AnonymityInfo;
	pointTopicInfo: PointTopicInfo;
	commentInfo?: any;
	json: string;
	user: User;
	uuid: string;
	eventTime: number;
	extJsonInfo: ExtJsonInfo;
	pics: any[];
	tmplId: number;
	expireTime: number;
	rcmdInfo?: any;
	showTime: number;
	actId: number;
	xInfo: XInfo;
	id: number;
	type: number;
}