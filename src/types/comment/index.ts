export interface Associator {
	vipCode: number;
	rights: boolean;
}

export interface VipRight {
	associator: Associator;
	musicPackage?: any;
	redVipAnnualCount: number;
	redVipLevel: number;
}

export interface User {
	avatarDetail?: any;
	commonIdentity?: any;
	locationInfo?: any;
	liveInfo?: any;
	followed: boolean;
	vipRights: VipRight;
	relationTag?: any;
	anonym: number;
	userId: number;
	userType: number;
	nickname: string;
	avatarUrl: string;
	authStatus: number;
	expertTags?: any;
	experts?: any;
	vipType: number;
	remarkName?: any;
	isHug: boolean;
}

export interface ShowFloorComment {
	replyCount: number;
	comments?: any;
	showReplyCount: boolean;
	topCommentIds?: any;
	target?: any;
}

export interface Decoration {
	repliedByAuthorCount: number;
}

export interface Tag {
	datas?: any;
	extDatas: any[];
	contentDatas?: any;
	relatedCommentIds?: any;
}

export interface ExtInfo {}

export interface CommentVideoVO {
	showCreationEntrance: boolean;
	allowCreation: boolean;
	creationOrpheusUrl?: any;
	playOrpheusUrl?: any;
	videoCount: number;
	forbidCreationText: string;
}

export interface Comment {
	user: User;
	beReplied?: any;
	commentId: number;
	content: string;
	richContent?: any;
	status: number;
	time: number;
	timeStr: string;
	needDisplayTime: boolean;
	likedCount: number;
	replyCount: number;
	liked: boolean;
	expressionUrl?: any;
	parentCommentId: number;
	repliedMark: boolean;
	pendantData?: any;
	showFloorComment: ShowFloorComment;
	decoration: Decoration;
	commentLocationType: number;
	musicianSayAirborne?: any;
	args?: any;
	tag: Tag;
	source?: any;
	resourceSpecialType?: any;
	extInfo: ExtInfo;
	commentVideoVO: CommentVideoVO;
	contentResource?: any;
	contentPicNosKey?: any;
	contentPicUrl?: any;
	grade?: any;
}

