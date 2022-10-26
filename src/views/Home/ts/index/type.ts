export interface MainTitle {
	title: string;
}

export interface Image {
	imageUrl: string;
}

export interface UiElement {
	mainTitle: MainTitle;
	image: Image;
	labelTexts: string[];
	rcmdShowType: string;
}

export interface MainTitle {
	title: string;
}

export interface Image {
	imageUrl: string;
}

export interface UiElement {
	mainTitle: MainTitle;
	image: Image;
	labelTexts: string[];
	rcmdShowType: string;
}

export interface ResourceExtInfo {
	playCount: number;
	highQuality: boolean;
	specialType: number;
}

export interface Resource {
	uiElement: UiElement;
	resourceType: string;
	resourceId: string;
	resourceUrl?: any;
	resourceExtInfo: ResourceExtInfo;
	action: string;
	actionType: string;
	valid: boolean;
	alg: string;
	logInfo: string;
	resourceContentList?: any;
}

export interface RootObject {
	creativeType: string;
	creativeId: string;
	action: string;
	actionType: string;
	uiElement: UiElement;
	resources: Resource[];
	alg: string;
	logInfo: string;
	position: number;
}