export default interface TankData {
	id: string;
	barrel: Barrel;
	barrelRecoilMultiplier: number;
	bulletOptions: BulletOptions;
	bulletRadius: number;
	bulletSpeed: number;
	bullets: Bullet[];
	hasRecoil: boolean;
	healthBar: HealthBar;
	maxRecoilAnimationTime: number;
	name: Name;
	prevShotTime: number;
	recoil: number;
	recoiledBarrelLength: number;
	reloadMilli: number;
	sprite: Sprite;
	borderPaint: Paint;
	paint: Paint;
	radius: number;
	acceleration: Vector2D;
	active: boolean;
	position: Vector2D;
	velocity: Vector2D;
}

export interface Barrel {
	angle: number;
	borderPaint: Paint;
	length: number;
	paint: Paint;
	rotationMatrix: { nativeInstance: number };
	thickness: number;
}

export interface Bullet {
	disintegrationSpeed: number;
	dying: boolean;
	timeSinceCreation: number;
	timeToLive: number;
	borderPaint: Paint;
	paint: Paint;
	radius: number;
	acceleration: Vector2D;
	active: boolean;
	position: Vector2D;
	velocity: Vector2D;
}

export interface BulletOptions {
	disintegrationSpeed: number;
	timeToLive: number;
	acceleration: Vector2D;
	active: boolean;
	velocity: Vector2D;
}

export interface HealthBar {
	backgroundPaint: Paint;
	health: number;
	healthFraction: number;
	healthPaint: Paint;
	maxHealth: number;
	size: Vector2D;
	position: Vector2D;
}

export interface Name {
	paint: Paint;
	text: string;
	position: Vector2D;
}

export interface Sprite {
	bitmap: Bitmap;
	rect: Rect;
}

export interface Bitmap {
	mHeight: number;
	mNativePtr: number;
	mWidth: number;
}

export interface Rect {
	bottom: number;
	left: number;
	right: number;
	top: number;
}

export interface Paint {
	mNativePaint: number;
}

export interface Vector2D {
	x: number;
	y: number;
}
