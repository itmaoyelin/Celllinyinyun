export interface User {
	locationInfo?: any;
	liveInfo?: any;
	anonym: number;
	commonIdentity?: any;
	userId: number;
	avatarDetail?: any;
	userType: number;
	avatarUrl: string;
	followed: boolean;
	mutual: boolean;
	remarkName?: any;
	vipRights?: any;
	nickname: string;
	authStatus: number;
	expertTags?: any;
	experts?: any;
	vipType: number;
}

export interface Comment {
	resourceType: number;
	time: number;
	content: string;
	combindId?: any;
	user: User;
	beRepliedUser?: any;
	liked: boolean;
	likedCount: number;
	resourceInfo: string;
	commentId: number;
	threadId: string;
	beRepliedContent?: any;
	expressionUrl?: any;
	beRepliedExpressionUrl?: any;
	parentCommentId: number;
	resourceSpecialType?: any;
}