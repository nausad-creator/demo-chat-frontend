export interface Category {
	categoryID: string;
	categoryName: string;
	categoryArabicName: string;
	categoryImage: string;
	categoryStatus: string;
	categoryCreatedDate: string;
	categoryDisplayOrder: string;
}
export interface Nationality {
	nationalityID: string;
	nationalityName: string;
	nationalityStatus: string;
}
export interface Home {
	banners: Banner[];
	category: Category[];
	bestsealling: ProductList[];
}
export interface Upload {
	fileName: string;
	status: string;
	message: string;
}
export interface Banner {
	bannerID: string;
	bannerName: string;
	bannerURL: string;
	bannerImage: string;
	bannerType: string;
	bannerTypeID: string;
	categoryName: string;
}
export interface UserUpdate {
	languageID: string;
	loginuserID: string;
	userFullName: string;
	userEmail: string;
	userMobile: string;
	nationalityID: string;
	userDOB: string;
	userProfilePicture: string;
}
export interface ProductList {
	productID: string;
	categoryID: string;
	subcatID: string;
	addedCartCount: number;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
	isFavorite: string;
	similarproducts: SimilarProducts[];
}
export interface ProductListDetails {
	productID: string;
	categoryID: string;
	subcatID: string;
	addedCartCount: number;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
	isFavorite: string;
	similarproducts: SimilarProducts[];
	productImageArray: string[];
	productImageArrayCopy: {
		src_id: string;
		src_name_eng: string;
		src_name_arb: string;
		src_img: string;
		src: string;
	}[];
}
export interface SimilarProducts {
	productID: string;
	categoryID: string;
	subcatID: string;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
	isFavorite: string;
}
export interface Language {
	languageID: string;
	languageName: string;
}
export interface Labels {
	Available_Quantity: string;
	sign_up: string;
	full_name: string;
	email_address: string;
	mobile_number: string;
	password: string;
	confirm_password: string;
	select_nationality: string;
	already_having_account: string;
	please_enter_name: string;
	please_enter_email: string;
	please_enter_password: string;
	please_enter_mobile: string;
	please_re_enter_password: string;
	please_select_dob: string;
	please_select_nationality: string;
	input_fields_will_not_be_less_than_3_characters: string;
	input_fields_will_not_be_more_than_60_characters: string;
	please_enter_valid_email: string;
	please_enter_valid_mobile_number: string;
	password_with_8_char_uppercase_and_number: string;
	re_entered_password_is_not_match: string;
	user_name: string;
	enter_username_or_email: string;
	enter_password: string;
	this_field_is_required: string;
	keep_me_signed: string;
	new_here: string;
	create_an_account: string;
	forgot: string;
	enter_register_email_or_mobile_to_reset_password: string;
	forgot_password: string;
	send_otp: string;
	enter_email_or_mobile: string;
	please_enter_valid_email_or_mobile: string;
	wait: string;
	verification: string;
	please_enter_4_digit_otp_received_on_email_phone: string;
	resend_otp: string;
	error: string;
	invalid_otp: string;
	we_have_sent_otp_on_you_registered_mobile: string;
	we_have_sent_otp_on_you_registered_email: string;
	submit: string;
	'oops!_something_went_wrong': string;
	reset_password: string;
	enter_new_password: string;
	re_enter_new_password: string;
	password_updated: string;
	all_category: string;
	search_products: string;
	search: string;
	deliver_to: string;
	best_selling_items: string;
	shop_by_categories: string;
	explore: string;
	our_partners: string;
	call_us: string;
	email_us: string;
	follow_us: string;
	download_app: string;
	about_us: string;
	privacy_policy: string;
	terms_conditions: string;
	contact_us: string;
	faq: string;
	help: string;
	support: string;
	add_to_cart: string;
	my_account: string;
	my_reviews: string;
	my_orders: string;
	my_wishlist: string;
	notifications: string;
	logout: string;
	settings: string;
	customer_support: string;
	profile_info: string;
	edit: string;
	profile_updated: string;
	saved_addresses: string;
	hey: string;
	saved_address: string;
	add_new_address: string;
	save_delivery_address: string;
	home: string;
	work: string;
	other: string;
	address: string;
	house_no_flat_no: string;
	landmark: string;
	please_enter_address: string;
	please_enter_house_flat: string;
	please_enter_landmark: string;
	please_select_address_type: string;
	address_add_success: string;
	address_delete_success: string;
	address_update_success: string;
	default_change_success: string;
	delivery_expected_by: string;
	your_order_has_been_placed: string;
	order_details: string;
	invoice: string;
	more_details: string;
	change_password: string;
	manage_notifications: string;
	current_password: string;
	new_pasword: string;
	retype_new_password: string;
	enter_current_password: string;
	please_enter_current_password: string;
	please_enter_re_enter_new_password: string;
	secure_password_tips: string;
	password_validation_label_1: string;
	password_validation_label_2: string;
	request_otp: string;
	reminders: string;
	new_offers: string;
	feedback_and_reviews: string;
	price_drop_back_in_stock_new_products: string;
	top_details_and_offers: string;
	ratting_and_review_of_purchase: string;
	select_address: string;
	address_list: string;
	add_address: string;
	product: string;
	price: string;
	quantity: string;
	subtotal: string;
	bill_details: string;
	item_total: string;
	discount: string;
	delivery_fees: string;
	delivery_tip: string;
	vat: string;
	net_payable: string;
	proceed_to_checkout: string;
	my_cart: string;
	proceed_to_pay: string;
	continue_shopping: string;
	delivery_address: string;
	checkout: string;
	payment_method: string;
	save_details_for_future_use: string;
	please_select_any_payment_option: string;
	alert: string;
	'please_wait...': string;
	order_successfully_placed: string;
	thanks_for_placing_order_with_us: string;
	query_and_further_information_contact_customer_support: string;
	tarck_order: string;
	currently_cart_is_empty: string;
	are_you_sure_you_want_to_remove_this_product: string;
	product_removed_success: string;
	please_add_address_to_avail_this_service: string;
	no_descriptions: string;
	description: string;
	reviews: string;
	add_to_wishlist: string;
	share: string;
	similar_items: string;
	filter_by_price: string;
	filter: string;
	top_selling_items: string;
	sort_by: string;
	select_to_sort: string;
	clear_all: string;
	we_are_here_to_help_with_your_issues: string;
	select_your_address: string;
	select_a_delivery_location_to_see_products_availbility_and_delivery_options: string;
	login_to_see_your_address: string;
}
export interface LOGIN {
	data: [];
	message: string;
	status: string;
}
export interface USER_RESPONSE {
	userID: string;
	userFirstName: string;
	userLastName: string;
	userEmail: string;
	userCountryCode: string;
	userMobile: string;
	userPassword: string;
	userProfilePicture: string;
	languageID: string;
	nationalityID: string;
	userDeviceType: string;
	userDeviceID: string;
	userVerified: string;
	userEmailNotification: string;
	userPushNotification: string;
	userSMSNotification: string;
	userStatus: string;
	userOTP: string;
	userDOB: string;
	userSignedRefKey: string;
	userReferKey: string;
	userD365ID: string;
	userCreatedDate: string;
	languageName: string;
	address: ADDRESS[];
	settings: SETTINGS[];
	storeID: string;
	storeName: string;
	stores: {
		storeID: string;
		storeName: string;
	}[];
}
export interface SETTINGS {
	settingsID: string;
	settingsEmailFrom: string;
	settingsEmailTo: string;
	settingsEmailGateway: string;
	settingEmailID: string;
	settingsEmailPass: string;
	settingsSSL: string;
	settingsTLS: string;
	settingEmailPort: string;
	settingSenderName: string;
	settingPGMode: string;
	settingsPGSandboxUrl: string;
	settingPGSandboxCustomerKey: string;
	settingsPGSandboxCustomerAuth: string;
	settingsPGLiveUrl: string;
	settingPGLiveCustomerKey: string;
	settingPGLiveCustomerAuth: string;
	settingsUserResetPinLinkExpHr: string;
	settingsLogDeleteDays: string;
	settingsDeliveryCharges: string;
	settingsFreeDeliveryAbove: string;
	settings1USDtoINR: string;
	settingsTollFree: string;
	settingsContactNo: string;
	settingsWhatsappNNo: string;
	settingsSalesEmail: string;
	settingsOrderReturnTimeMinutes: string;
	settingsMasterOtp: string;
	settingsJhoneaGST: string;
	settingsPaymentUrl: string;
	settingsPaymentSuccessUrl: string;
	settingsPaymentErrorUrl: string;
	settingsPackgingcharge: string;
	settingsShippingcharge: string;
	settingsMaintenance: string;
	settingsOthermaintenance: string;
	settingsMinimumOrderValue: string;
	settingsReferredPoints: string;
	settingsReferringPoints: string;
	settingsWalletUsePer: string;
	settingsDeliverySlot: string;
	settingsFBUrl: string;
	settingsInstaURL: string;
	settingsGooglePage: string;
	settingsAddress: string;
}
export interface ADDRESS {
	addressID: string;
	userID: string;
	addressTitle: string;
	addressBuildingName: string;
	addressBlockNo: string;
	addressStreetName: string;
	addressLandmark: string;
	cityID: string;
	stateID: string;
	countryID: string;
	addressPincode: string;
	addressLati: string;
	addressLongi: string;
	addressMobile: string;
	addressGST: string;
	addressPAN: string;
	addressType: string;
	addressIsDefault: string;
	addressCreatedDate: string;
	countryName: string;
	cityName: string;
	fullAddress: string;
}
export interface FORGOT {
	userMobile: string;
	userID: string;
	status?: string;
	message?: string;
}
export interface Otp {
	loginrestaurantID: string;
	restaurantOTP: string;
	languageID: string;
	userOTP1: string;
	userOTP2: string;
	userOTP3: string;
	userOTP4: string;
}
export interface ResetInterface {
	loginuserID: string;
	userNewPassword: string;
	userReNewPassword: string;
	languageID: string;
}
export interface TempOrders {
	orderdetails: OrderDetailsTemp[];
	temporderDate: string;
	temporderID: string;
	userFullName: string;
	userID: string;
	userMobile: string;
	billingDetails: {
		delivery_Tip: number;
		delivery_Fee: number;
		item_Total: number;
		vat: number;
		net_Payable: number;
	};
}
export interface Orders {
	orderID: string;
	userID: string;
	orderNo: string;
	orderDate: string;
	orderBillingAddress: string;
	orderDeliveryAddress: string;
	orderDeliveryLat: string;
	orderDeliveryLong: string;
	orderDeliveryCharges: string;
	statusID: string;
	orderStatusDate: string;
	orderStatusRemark: string;
	orderDiscountCode: string;
	orderDiscount: string;
	orderWalletAmt: string;
	orderGrossAmt: string;
	orderVAT: string;
	orderNetAmount: string;
	orderPaymentMode: string;
	orderDeliveryType: string;
	orderDeliveryDate: string;
	orderPaymentStatus: string;
	orderPaymentTransactionID: string;
	orderNotes: string;
	orderRatingPending: string;
	userFullName: string;
	userMobile: string;
	statusName: string;
	orderdetails: OrderDetails[];
	timeline: [
		{
			orderstatusID: string;
			orderID: string;
			statusID: string;
			orderstatusDate: string;
			orderstatusRemark: string;
			statusName: string;
		}
	];
}
export interface OrderDetailsTemp {
	Price: string;
	Qty: string;
	categoryID: string;
	categoryName: string;
	productArabicNme: string;
	productCreatedDate: string;
	productDescription: string;
	productID: string;
	productImage: string;
	productMOQ: string;
	productName: string;
	productPackagesize: string;
	productPrice: string;
	productPriceVat: string;
	productRatingAvg: string;
	productRatingCount: string;
	productReviewCount: string;
	productSKU: string;
	productSoldCount: string;
	productStatus: string;
	productTag: string;
	subcatID: string;
}
export interface OrderDetails {
	orderdetailsID: string;
	orderID: string;
	productID: string;
	orderdetailsQty: string;
	orderdetailsPrice: string;
	statusID: string;
	statusName: string;
	categoryID: string;
	subcatID: string;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	categoryName: string;
}
export interface ChangePassword {
	userCurrentPassword: string;
	userNewPassword: string;
	userNewRePassword: string;
}
export interface TempCartItems {
	productID: string;
	qty: number;
}
export interface Store {
	storeID: string;
	storeClientID: string;
	storeName: string;
	storeManagerName: string;
	storeCode: string;
	storeCity: string;
	cityID: string;
	storeEmail: string;
	storeManagerMobile: string;
	storeMobile: string;
	storeOpeningTime: string;
	storeClosingTime: string;
	storeOffDay: string;
	storeLatitude: string;
	storeLangitude: string;
	storeMapUrl: string;
	storeStatus: string;
	storeBarqHubID: string;
	distance_in_km: string;
	offlinedelivery: string;
}
export interface AddressComponents {
	long_name: string;
	short_name: string;
	types: string[];
}
export interface Wishlist {
	userfavproductID: string;
	productID: string;
	userID: string;
	userfavproductDate: string;
	categoryID: string;
	subcatID: string;
	productName: string;
	productArabicNme: string;
	productSKU: string;
	productTag: string;
	productDescription: string;
	productPriceVat: string;
	productPrice: string;
	productMOQ: string;
	productImage: string;
	productPackagesize: string;
	productReviewCount: string;
	productRatingCount: string;
	productRatingAvg: string;
	productSoldCount: string;
	productStatus: string;
	productCreatedDate: string;
	addedCartCount: number;
}
export interface Country {
	countryID: string;
	countryName: string;
	countryISO3Code: string;
	countryISO2Code: string;
	countryCurrencyCode: string;
	countryDialCode: string;
	countryFlagImage: string;
	countryTimezone: string;
	countryStatus: string;
	countryCreatedDate: string;
}
export interface States {
	stateID: string;
	countryID: string;
	stateName: string;
}
export interface ZipCodes {
	zipID: string;
	countryID: string;
	stateID: string;
	cityID: string;
	locationID: string;
	zipRemark: string;
	zipCode: string;
	zipStatus: string;
	cityName: string;
	stateName: string;
	countryName: string;
}
export interface Cities {
	cityID: string;
	stateID: string;
	countryID: string;
	cityName: string;
	stateName: string;
}