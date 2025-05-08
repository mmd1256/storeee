/**
 * فایل جاوااسکریپت صفحه محصولات
 * این فایل شامل تمام توابع و عملکردهای لازم برای بخش محصولات است
 * ---------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", function() {
    // متغیرهای سراسری
    const body = document.body;
    const filtersToggle = document.getElementById("filters-toggle");
    const filtersSidebar = document.getElementById("filters-sidebar");
    const closeFilters = document.getElementById("close-filters");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const sortSelect = document.getElementById("sort-by");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const productsGrid = document.getElementById("products-grid");
    const gridViewBtn = document.querySelector(".grid-view");
    const listViewBtn = document.querySelector(".list-view");
    const priceFilterBtns = document.querySelectorAll(".price-filter-btn");
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox input");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const colorBtns = document.querySelectorAll(".color-btn");
    const filterGroupTitles = document.querySelectorAll(".filter-group-title");
    const clearFiltersBtn = document.querySelector(".clear-filters-btn");
    const applyFiltersBtn = document.querySelector(".apply-filters-btn");
    const productCards = document.querySelectorAll(".product-card");
    const wishlistBtns = document.querySelectorAll(".wishlist-btn");
    const compareBtns = document.querySelectorAll(".compare-btn");
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const removeComparisonItemBtns = document.querySelectorAll(".remove-comparison-item");
    const clearComparisonBtn = document.querySelector(".clear-comparison-btn");
    const startComparisonBtn = document.querySelector(".start-comparison-btn");
    const comparisonBar = document.getElementById("comparison-bar");
    const activeFilters = document.getElementById("active-filters");
    const clearAllFiltersBtn = document.querySelector(".clear-all-filters");
    const filterTags = document.querySelectorAll(".filter-tag");
    const paginationBtns = document.querySelectorAll(".page-btn");
    const cartToggle = document.getElementById("cart-toggle");
    const cartDrawer = document.getElementById("cart-drawer");
    const closeCart = document.getElementById("close-cart");
    const continueShopping = document.getElementById("continue-shopping");
    const checkoutBtn = document.getElementById("checkout-btn");
    const profileToggle = document.getElementById("profile-toggle");
    const profilePanel = document.getElementById("profile-panel");
    const closeProfile = document.getElementById("close-profile");
    const switchToRegister = document.getElementById("switch-to-register");
    const switchToLogin = document.getElementById("switch-to-login");
    const chatToggle = document.getElementById("chat-toggle");
    const chatPopup = document.getElementById("chat-popup");
    const closeChat = document.getElementById("close-chat");
    const sendMessage = document.getElementById("send-message");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
    const arBtns = document.querySelectorAll(".ar-btn");
    const searchToggle = document.getElementById("search-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");
    const scrollToTop = document.getElementById("scroll-to-top");
    
    // بررسی وجود عناصر DOM برای جلوگیری از خطاها
    console.log("بررسی عناصر DOM حیاتی:", {
        modalBackdrop: !!modalBackdrop,
        profilePanel: !!profilePanel,
        profileToggle: !!profileToggle,
        closeProfile: !!closeProfile
    });
    
    // مدیریت فیلترها در نسخه موبایل
    if (filtersToggle && filtersSidebar && closeFilters && modalBackdrop) {
        filtersToggle.addEventListener("click", function() {
            filtersSidebar.classList.add("active");
            modalBackdrop.classList.add("active");
            body.style.overflow = "hidden";
        });
        
        closeFilters.addEventListener("click", function() {
            filtersSidebar.classList.remove("active");
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
        });
    }
    
    // مدیریت حالت‌های نمایش محصولات (شبکه‌ای/لیستی)
    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.addEventListener("click", function() {
            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
            productsGrid.classList.remove("list-view");
            
            // ذخیره تنظیمات در localStorage
            localStorage.setItem("productsViewMode", "grid");
        });
        
        listViewBtn.addEventListener("click", function() {
            listViewBtn.classList.add("active");
            gridViewBtn.classList.remove("active");
            productsGrid.classList.add("list-view");
            
            // ذخیره تنظیمات در localStorage
            localStorage.setItem("productsViewMode", "list");
        });
        
        // بازیابی حالت نمایش ذخیره شده
        const savedViewMode = localStorage.getItem("productsViewMode");
        if (savedViewMode === "list") {
            listViewBtn.click();
        }
    }
    
    // مدیریت سبد خرید
    if (cartToggle && cartDrawer && closeCart && modalBackdrop) {
        cartToggle.addEventListener("click", function() {
            cartDrawer.classList.add("active");
            modalBackdrop.classList.add("active");
            body.style.overflow = "hidden";
            
            // به‌روزرسانی نمایش محصولات در سبد خرید
            updateCartDisplay();
        });
        
        closeCart.addEventListener("click", function() {
            cartDrawer.classList.remove("active");
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
        });
        
        if (continueShopping) {
            continueShopping.addEventListener("click", function() {
                cartDrawer.classList.remove("active");
                modalBackdrop.classList.remove("active");
                body.style.overflow = "";
            });
        }
    }

    // مدیریت پنل حساب کاربری - کاملاً بازنویسی شده برای اطمینان از عملکرد صحیح
    if (profileToggle && profilePanel && closeProfile && modalBackdrop) {
        console.log("تنظیم رویدادهای پنل کاربری");
        
        // نمایش پنل کاربری با کلیک روی آیکون
        profileToggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("کلیک روی دکمه پروفایل");
            
            // نمایش پنل و پس‌زمینه مودال
            profilePanel.classList.add("active");
            modalBackdrop.classList.add("active");
            body.style.overflow = "hidden";
            
            // اضافه کردن کلاس no-scroll به body
            document.body.classList.add("no-scroll");
        });
        
        // بستن پنل با کلیک روی دکمه بستن
        if (closeProfile) {
            closeProfile.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("کلیک روی دکمه بستن پروفایل");
                
                // مخفی کردن پنل و پس‌زمینه مودال
                profilePanel.classList.remove("active");
                modalBackdrop.classList.remove("active");
                body.style.overflow = "";
                
                // حذف کلاس no-scroll از body
                document.body.classList.remove("no-scroll");
            });
        } else {
            console.error("دکمه بستن پروفایل یافت نشد!");
        }
        
        // تغییر بین فرم‌های ورود و ثبت‌نام
        if (switchToRegister) {
            switchToRegister.addEventListener("click", function(e) {
                e.preventDefault();
                const loginForm = document.querySelector(".login-form");
                const registerForm = document.querySelector(".register-form");
                if (loginForm && registerForm) {
                    loginForm.classList.remove("active");
                    registerForm.classList.add("active");
                }
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener("click", function(e) {
                e.preventDefault();
                const loginForm = document.querySelector(".login-form");
                const registerForm = document.querySelector(".register-form");
                if (loginForm && registerForm) {
                    registerForm.classList.remove("active");
                    loginForm.classList.add("active");
                }
            });
        }
        
        // کنترل فرم‌های ورود و ثبت‌نام
        setupAuthForms();
                    } else {
        console.error("یکی از عناصر ضروری پنل کاربری یافت نشد:", {
            profileToggle: !!profileToggle,
            profilePanel: !!profilePanel,
            closeProfile: !!closeProfile,
            modalBackdrop: !!modalBackdrop
        });
    }
    
    // بستن همه پنل‌ها با کلیک روی پس‌زمینه
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", function() {
            console.log("کلیک روی پس‌زمینه");
            // بستن همه پنل‌ها
            if (profilePanel) profilePanel.classList.remove("active");
            if (cartDrawer) cartDrawer.classList.remove("active");
            if (filtersSidebar) filtersSidebar.classList.remove("active");
            if (mobileMenu) mobileMenu.classList.remove("active");
            
            // حذف پس‌زمینه و فعال‌سازی اسکرول
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
            document.body.classList.remove("no-scroll");
        });
    }
    
    // مدیریت منوی موبایل
    if (menuToggle && mobileMenu && closeMenu && modalBackdrop) {
        menuToggle.addEventListener("click", function() {
            mobileMenu.classList.add("active");
            modalBackdrop.classList.add("active");
            body.style.overflow = "hidden";
        });
        
        closeMenu.addEventListener("click", function() {
            mobileMenu.classList.remove("active");
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
        });
    }
    
    // تنظیم تمام رویدادهای کلیک فرم‌های احراز هویت
    function setupAuthForms() {
        const loginForm = document.querySelector(".login-form form");
        const registerForm = document.querySelector(".register-form form");
        const togglePasswordBtns = document.querySelectorAll(".toggle-password");
        
        // مدیریت نمایش/مخفی کردن رمز عبور
        if (togglePasswordBtns.length > 0) {
            togglePasswordBtns.forEach(btn => {
                btn.addEventListener("click", function() {
                    const passwordInput = this.parentElement.querySelector("input");
                    const icon = this.querySelector("i");
                    
                    if (passwordInput.type === "password") {
                        passwordInput.type = "text";
                        icon.classList.remove("ri-eye-line");
                        icon.classList.add("ri-eye-off-line");
                    } else {
                        passwordInput.type = "password";
                        icon.classList.remove("ri-eye-off-line");
                        icon.classList.add("ri-eye-line");
                    }
                });
            });
        }
        
        // مدیریت ارسال فرم ورود
        if (loginForm) {
            loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
                
                const phoneInput = document.getElementById("login-phone");
                const passwordInput = document.getElementById("login-password");
                const rememberMeCheckbox = document.getElementById("remember-me");
                
                if (!phoneInput || !passwordInput) {
                    console.error("فیلدهای فرم ورود یافت نشد");
                    return;
                }
                
                const phone = phoneInput.value.trim();
                const password = passwordInput.value;
                const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
                
                // اعتبارسنجی فرم
                if (!phone) {
                    showNotification("لطفاً شماره موبایل خود را وارد کنید", "error");
            return;
        }
        
                if (!password) {
                    showNotification("لطفاً رمز عبور خود را وارد کنید", "error");
            return;
        }
        
                // نمایش لودر
                showPageLoadingAnimation();
        
                // شبیه‌سازی درخواست ورود به سرور
        setTimeout(() => {
                    // اینجا در یک پروژه واقعی با سرور ارتباط برقرار می‌کنید
                    
                    // ذخیره اطلاعات کاربر در localStorage
                    const userData = {
                        phone: phone,
                        isLoggedIn: true,
                        name: "کاربر تست",
                        lastLogin: new Date().toISOString()
                    };
                    
                    localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // بستن پنل پروفایل
                    profilePanel.classList.remove("active");
                    modalBackdrop.classList.remove("active");
                    body.style.overflow = "";
                    document.body.classList.remove("no-scroll");
                    
                    // نمایش اعلان موفقیت
                    showNotification("ورود با موفقیت انجام شد", "success");
                    
                    // به‌روزرسانی UI برای کاربر وارد شده
                    updateProfileUIForLoggedInUser(userData);
                }, 1200);
            });
        }
        
        // مدیریت ارسال فرم ثبت‌نام
        if (registerForm) {
            registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
                
                const nameInput = document.getElementById("register-name");
                const phoneInput = document.getElementById("register-phone");
                const passwordInput = document.getElementById("register-password");
                const termsAgreeCheckbox = document.getElementById("terms-agree");
                
                if (!nameInput || !phoneInput || !passwordInput || !termsAgreeCheckbox) {
                    console.error("فیلدهای فرم ثبت‌نام یافت نشد");
            return;
        }
        
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                const password = passwordInput.value;
                const termsAgreed = termsAgreeCheckbox.checked;
                
                // اعتبارسنجی فرم
                if (!name) {
                    showNotification("لطفاً نام و نام خانوادگی خود را وارد کنید", "error");
                    return;
                }
                
                if (!phone) {
                    showNotification("لطفاً شماره موبایل خود را وارد کنید", "error");
                    return;
                }
                
                if (!password) {
                    showNotification("لطفاً رمز عبور خود را وارد کنید", "error");
            return;
        }
        
        if (password.length < 8) {
                    showNotification("رمز عبور باید حداقل 8 کاراکتر باشد", "error");
            return;
        }
        
        if (!termsAgreed) {
                    showNotification("برای ثبت‌نام باید قوانین و مقررات را بپذیرید", "error");
            return;
        }
        
                // نمایش لودر
                showPageLoadingAnimation();
        
                // شبیه‌سازی درخواست ثبت‌نام به سرور
        setTimeout(() => {
                    // نمایش اعلان موفقیت
                    showNotification("ثبت‌نام با موفقیت انجام شد", "success");
                    
                    // تغییر به فرم ورود
                    const loginForm = document.querySelector(".login-form");
                    const registerForm = document.querySelector(".register-form");
                    
                    if (loginForm && registerForm) {
                        registerForm.classList.remove("active");
                        loginForm.classList.add("active");
            
            // پر کردن خودکار فیلد شماره موبایل در فرم ورود
                        const loginPhoneInput = document.getElementById("login-phone");
                        if (loginPhoneInput) {
                            loginPhoneInput.value = phone;
                        }
                    }
                }, 1200);
            });
        }
    }
    
    // به‌روزرسانی UI پروفایل برای کاربر وارد شده
    function updateProfileUIForLoggedInUser(userData) {
        if (!profileToggle) return;
        
        // تغییر آیکون پروفایل
        const profileIcon = profileToggle.querySelector("i");
        if (profileIcon) {
            profileIcon.classList.remove("ri-user-3-line");
            profileIcon.classList.add("ri-user-smile-line");
        }
        
        // ایجاد پنل کاربر برای جایگزینی با فرم ورود
        const userPanelHTML = `
            <div class="user-panel active">
            <div class="user-welcome">
                <div class="user-avatar">
                    <i class="ri-user-smile-fill"></i>
                </div>
                <div class="user-info">
                        <h4>خوش آمدید، ${userData.name}</h4>
                        <p>${maskPhoneNumber(userData.phone)}</p>
                </div>
            </div>
            <div class="user-menu">
                <a href="#" class="user-menu-item">
                    <i class="ri-shopping-bag-line"></i>
                    <span>سفارش‌های من</span>
                </a>
                <a href="#" class="user-menu-item">
                    <i class="ri-heart-line"></i>
                    <span>علاقه‌مندی‌ها</span>
                </a>
                <a href="#" class="user-menu-item">
                    <i class="ri-map-pin-line"></i>
                    <span>آدرس‌های من</span>
                </a>
                <a href="#" class="user-menu-item">
                    <i class="ri-user-settings-line"></i>
                    <span>اطلاعات حساب کاربری</span>
                </a>
                <a href="#" class="user-menu-item">
                    <i class="ri-coupon-line"></i>
                    <span>کدهای تخفیف</span>
                </a>
            </div>
            <button id="logout-btn" class="logout-btn">
                <i class="ri-logout-box-line"></i>
                <span>خروج از حساب کاربری</span>
            </button>
            </div>
        `;
        
        // جایگزینی فرم ورود با پنل کاربر
        const loginForm = document.querySelector(".login-form");
        const registerForm = document.querySelector(".register-form");
        
        if (loginForm && registerForm) {
            loginForm.classList.remove("active");
            registerForm.classList.remove("active");
            
            const profileContent = document.querySelector(".profile-content");
            if (profileContent) {
                // بررسی اگر پنل کاربر قبلاً وجود دارد، آن را حذف کن
                const existingUserPanel = profileContent.querySelector(".user-panel");
                if (existingUserPanel) {
                    existingUserPanel.remove();
                }
                
                // افزودن پنل کاربر جدید
                profileContent.insertAdjacentHTML("beforeend", userPanelHTML);
                
                // اضافه کردن رویداد به دکمه خروج
                const logoutBtn = document.getElementById("logout-btn");
                if (logoutBtn) {
                    logoutBtn.addEventListener("click", function() {
                        // حذف اطلاعات کاربر از localStorage
                        localStorage.removeItem("userData");
            
            // حذف پنل کاربر
                        const userPanel = document.querySelector(".user-panel");
                        if (userPanel) {
            userPanel.remove();
                        }
            
            // بازگرداندن فرم ورود
                        loginForm.classList.add("active");
                        
                        // تغییر آیکون پروفایل به حالت اولیه
                        if (profileIcon) {
                            profileIcon.classList.remove("ri-user-smile-line");
                            profileIcon.classList.add("ri-user-3-line");
                        }
            
            // بستن پنل پروفایل
                        if (profilePanel) {
                            profilePanel.classList.remove("active");
                        }
                        if (modalBackdrop) {
                            modalBackdrop.classList.remove("active");
                        }
                        body.style.overflow = "";
                        document.body.classList.remove("no-scroll");
                        
                        // نمایش اعلان
                        showNotification("با موفقیت از حساب کاربری خارج شدید", "info");
                    });
                }
            }
        }
    }
    
    // پنهان کردن بخشی از شماره موبایل برای نمایش امن
    function maskPhoneNumber(phone) {
        if (!phone || phone.length < 11) return phone;
        return phone.substring(0, 4) + "***" + phone.substring(7);
    }
    
    // بررسی وضعیت ورود کاربر هنگام بارگذاری صفحه
    function checkUserLoginStatus() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                if (parsedUserData.isLoggedIn) {
                    // به‌روزرسانی UI برای کاربر وارد شده
                    updateProfileUIForLoggedInUser(parsedUserData);
                }
            } catch (e) {
                console.error("خطا در بازیابی اطلاعات کاربر:", e);
                localStorage.removeItem("userData");
            }
        }
    }
    
    // بررسی وضعیت ورود کاربر در هنگام بارگذاری صفحه
    checkUserLoginStatus();
    
    // نمایش اعلان
    function showNotification(message, type = "info") {
        // بررسی وجود دیو اعلان‌ها
        let notificationsContainer = document.querySelector(".notifications-container");
        
        // اگر وجود نداشت، آن را ایجاد کن
        if (!notificationsContainer) {
            notificationsContainer = document.createElement("div");
            notificationsContainer.className = "notifications-container";
            document.body.appendChild(notificationsContainer);
        }
        
        // ایجاد اعلان جدید
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        
        // مشخص کردن آیکون براساس نوع اعلان
        let icon = "";
        switch (type) {
            case "success":
                icon = '<i class="ri-check-line"></i>';
                break;
            case "error":
                icon = '<i class="ri-close-circle-line"></i>';
                break;
            case "warning":
                icon = '<i class="ri-alert-line"></i>';
                break;
            case "info":
                icon = '<i class="ri-information-line"></i>';
                break;
        }
        
        // افزودن محتوا به اعلان
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">${message}</div>
            <button class="notification-close"><i class="ri-close-line"></i></button>
        `;
        
        // افزودن اعلان به کانتینر
        notificationsContainer.appendChild(notification);
        
        // نمایش اعلان با انیمیشن
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);
        
        // دکمه بستن اعلان
        const closeBtn = notification.querySelector(".notification-close");
        closeBtn.addEventListener("click", () => {
            notification.classList.remove("show");
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // حذف خودکار اعلان پس از 5 ثانیه
        setTimeout(() => {
            if (notification.parentNode === notificationsContainer) {
                notification.classList.remove("show");
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // نمایش انیمیشن بارگذاری صفحه
    function showPageLoadingAnimation() {
        // بررسی وجود لودر
        let pageLoader = document.querySelector(".page-loader");
        
        // اگر وجود نداشت، آن را ایجاد کن
        if (!pageLoader) {
            pageLoader = document.createElement("div");
            pageLoader.className = "page-loader";
            pageLoader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">در حال بارگذاری...</div>
                </div>
            `;
            document.body.appendChild(pageLoader);
        }
        
        // نمایش لودر
        pageLoader.classList.add("active");
        
        // مخفی کردن لودر پس از 800 میلی‌ثانیه
        setTimeout(() => {
            pageLoader.classList.remove("active");
        }, 800);
    }
    
    // به‌روزرسانی وضعیت دکمه پرداخت
    function updateCheckoutButtonState() {
        if (!checkoutBtn) return;
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length > 0) {
            checkoutBtn.removeAttribute("disabled");
        } else {
            checkoutBtn.setAttribute("disabled", "disabled");
        }
    }
    
    // اضافه کردن استایل‌های پویا
    addDynamicStyles();
    
    /**
     * افزودن استایل‌های پویا به صفحه
     */
    function addDynamicStyles() {
        const styleTag = document.createElement("style");
        styleTag.textContent = `
            /* استایل انیمیشن‌ها */
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .pulse {
                animation: pulse 0.5s ease-in-out;
            }
            
            /* چرخش آیکون */
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .rotating {
                animation: rotate 1s linear infinite;
            }
            
            /* استایل اعلان‌ها */
            .notifications-container {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column-reverse;
                gap: 10px;
                max-width: 350px;
            }
            
            .notification {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 12px;
                transform: translateX(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
                            .notification.success {
                border-right: 4px solid var(--success-color, #4CAF50);
            }
            
            .notification.error {
                border-right: 4px solid var(--error-color, #F44336);
            }
            
            .notification.warning {
                border-right: 4px solid var(--warning-color, #FF9800);
            }
            
            .notification.info {
                border-right: 4px solid var(--info-color, #2196F3);
            }
            
            .notification-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .notification.success .notification-icon {
                color: var(--success-color, #4CAF50);
            }

            .notification.error .notification-icon {
                color: var(--error-color, #F44336);
            }

            .notification.warning .notification-icon {
                color: var(--warning-color, #FF9800);
            }

            .notification.info .notification-icon {
                color: var(--info-color, #2196F3);
            }

            .notification-content {
                flex: 1;
                font-size: 14px;
            }

            .notification-close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 0;
                font-size: 16px;
            }

            /* استایل لودر صفحه */
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: transparent;
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            .page-loader.active {
                opacity: 1;
            }

            .page-loader:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 30%;
                background: linear-gradient(to right, var(--primary-color-light, #6495ED), var(--primary-color, #4169E1));
                animation: loading 0.8s infinite ease-in-out;
                border-radius: 0 3px 3px 0;
            }

            @keyframes loading {
                0% { left: -30%; }
                100% { left: 100%; }
            }

            /* استایل‌های مربوط به پنل حساب کاربری */
            .profile-panel {
                transition: transform 0.3s ease, opacity 0.3s ease;
                transform: translateX(100%);
                opacity: 0;
                visibility: hidden;
            }

            .profile-panel.active {
                transform: translateX(0);
                opacity: 1;
                visibility: visible;
            }

            /* استایل دکمه خروج */
            .logout-btn {
                width: 100%;
                padding: 12px 15px;
                margin-top: 20px;
                background-color: #f8f8f8;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                color: #f44336;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .logout-btn:hover {
                background-color: #fff0f0;
                border-color: #ffcdd2;
            }

            /* استایل پنل کاربر */
            .user-panel {
                display: none;
                padding: 15px 0;
            }

            .user-panel.active {
                display: block;
            }

            .user-welcome {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background-color: #f5f8ff;
                border-radius: 10px;
                margin-bottom: 20px;
            }

            .user-avatar {
                width: 60px;
                height: 60px;
                background-color: #e3e9ff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                color: #4721ff;
            }

            .user-info h4 {
                margin: 0 0 5px 0;
                font-size: 16px;
                font-weight: 600;
            }

            .user-info p {
                margin: 0;
                font-size: 14px;
                color: #666;
            }

            .user-menu {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .user-menu-item {
                padding: 12px 15px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 12px;
                color: #333;
                text-decoration: none;
                transition: all 0.2s ease;
            }

            .user-menu-item:hover {
                background-color: #f5f5f5;
            }

            .user-menu-item i {
                font-size: 20px;
                color: #666;
            }

            /* کلاس برای جلوگیری از اسکرول */
            body.no-scroll {
                overflow: hidden;
            }
        `;
        
        document.head.appendChild(styleTag);
    }

    // تابع برای بررسی صحت عملکرد پنل کاربری
    function testProfilePanelFunctionality() {
        if (profilePanel && profileToggle && closeProfile) {
            console.log("آزمایش عملکرد پنل کاربری");
            
            // تست دسترسی به عناصر DOM
            console.log("- دسترسی به عناصر DOM:", {
                profilePanel: true,
                profileToggle: true,
                closeProfile: true
            });
            
            // تست رویدادهای کلیک
            console.log("- رویدادهای کلیک تنظیم شده");
            
            // تست وضعیت نمایش فعلی
            console.log("- وضعیت فعلی نمایش:", profilePanel.classList.contains("active") ? "فعال" : "غیرفعال");
            } else {
            console.error("خطا در پنل کاربری: برخی عناصر DOM یافت نشد");
        }
    }
    
    // اجرای تست عملکرد پنل کاربری بعد از بارگذاری کامل صفحه
    setTimeout(testProfilePanelFunctionality, 1000);
    
    // اضافه کردن رویداد کلیک به کل صفحه برای دیباگ مشکل پنل کاربری
    document.addEventListener("click", function(e) {
        // بررسی کلیک روی دکمه باز/بسته کردن پنل کاربری
        if (e.target === profileToggle || profileToggle.contains(e.target)) {
            console.log("کلیک روی دکمه پروفایل شناسایی شد");
        }
        
        // بررسی کلیک روی دکمه بستن پنل کاربری
        if (e.target === closeProfile || (closeProfile && closeProfile.contains(e.target))) {
            console.log("کلیک روی دکمه بستن پروفایل شناسایی شد");
        }
    });
    
    // مقداردهی اولیه فیلدها برای تست ساده‌تر
    setTimeout(function() {
        const loginPhoneInput = document.getElementById("login-phone");
        const loginPasswordInput = document.getElementById("login-password");
        
        if (loginPhoneInput && loginPasswordInput) {
            // مقداردهی اولیه برای تست
            loginPhoneInput.value = "09123456789";
            loginPasswordInput.value = "password123";
        }
    }, 2000);
    
    // نمایش راهنمای اولیه
    setTimeout(function() {
        showNotification("برای ثبت‌نام یا ورود، روی آیکون کاربر در نوار بالا کلیک کنید", "info");
    }, 3000);
    
    // مدیریت فرم‌های جستجو
    if (searchToggle) {
        console.log("راه‌اندازی جستجو");
        
        searchToggle.addEventListener("click", function() {
            // ایجاد مودال جستجو
            let searchModal = document.querySelector(".search-modal");
            
            // اگر مودال جستجو وجود ندارد، آن را ایجاد کن
            if (!searchModal) {
                searchModal = document.createElement("div");
                searchModal.className = "search-modal";
                searchModal.innerHTML = `
                    <div class="search-modal-content">
                        <form class="search-form">
                            <input type="text" class="search-input" placeholder="جستجوی محصولات..." autofocus>
                            <button type="submit" class="search-btn"><i class="ri-search-line"></i></button>
                            <button type="button" class="close-search-btn"><i class="ri-close-line"></i></button>
                        </form>
                        <div class="search-suggestions">
                            <h4>جستجوهای پرطرفدار</h4>
                            <div class="popular-search-tags">
                                <a href="#" class="search-tag">کفش نایک</a>
                                <a href="#" class="search-tag">کفش اسپرت مردانه</a>
                                <a href="#" class="search-tag">کفش آدیداس</a>
                                <a href="#" class="search-tag">کفش ورزشی</a>
                                <a href="#" class="search-tag">کفش پیاده‌روی</a>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(searchModal);
                
                // تنظیم رویدادهای مودال جستجو
                setupSearchModalEvents(searchModal);
            }
            
            // نمایش مودال با انیمیشن
            setTimeout(() => {
                searchModal.classList.add("active");
                
                // تمرکز روی فیلد جستجو
                const searchInput = searchModal.querySelector(".search-input");
                if (searchInput) searchInput.focus();
            }, 10);
        });
        
        // تنظیم رویدادهای مودال جستجو
        function setupSearchModalEvents(modal) {
            // دکمه بستن جستجو
            const closeSearchBtn = modal.querySelector(".close-search-btn");
            if (closeSearchBtn) {
                closeSearchBtn.addEventListener("click", function() {
                    modal.classList.remove("active");
                    setTimeout(() => {
                        // برای جلوگیری از مشکلات حافظه، مودال را حذف نمی‌کنیم
                        // فقط غیرفعال می‌کنیم
                    }, 300);
                });
            }
            
            // کلیک خارج از محتوا
            modal.addEventListener("click", function(e) {
                if (e.target === modal) {
                    modal.classList.remove("active");
                }
            });
            
            // ارسال فرم جستجو
            const searchForm = modal.querySelector(".search-form");
            if (searchForm) {
                searchForm.addEventListener("submit", function(e) {
                    e.preventDefault();
                    
                    const searchInput = this.querySelector(".search-input");
                    if (!searchInput) return;
                    
                    const query = searchInput.value.trim();
                    if (!query) return;
                    
                    // نمایش لودر
                    showLoadingOverlay();
                    
                    // انتقال به صفحه نتایج جستجو
                    setTimeout(() => {
                        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                    }, 500);
                });
            }
            
            // کلیک روی تگ‌های جستجوی پرطرفدار
            const searchTags = modal.querySelectorAll(".search-tag");
            searchTags.forEach(tag => {
                tag.addEventListener("click", function(e) {
                    e.preventDefault();
                    const query = this.textContent.trim();
                    
                    // نمایش لودر
                    showLoadingOverlay();
                    
                    // انتقال به صفحه نتایج جستجو
                    setTimeout(() => {
                        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                    }, 500);
        });
    });
        }
    }

    // اضافه کردن استایل‌های پویا برای بخش جستجو
    function addSearchStyles() {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            /* استایل‌های مودال جستجو */
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                z-index: 9999;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease;
            }
            
            .search-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .search-modal-content {
                width: 100%;
                max-width: 600px;
                margin-top: 80px;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                padding: 20px;
                transform: translateY(-30px);
                transition: transform 0.3s ease;
            }
            
            .search-modal.active .search-modal-content {
                transform: translateY(0);
            }
            
            .search-form {
                position: relative;
                margin-bottom: 20px;
            }
            
            .search-input {
                width: 100%;
                padding: 12px 45px 12px 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                font-size: 16px;
                outline: none;
                transition: border-color 0.2s ease;
            }
            
            .search-input:focus {
                border-color: #4721ff;
                box-shadow: 0 0 0 3px rgba(71, 33, 255, 0.1);
            }
            
            .search-btn {
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: #4721ff;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
            }
            
            .close-search-btn {
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: #999;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
            }
            
            .search-suggestions h4 {
                font-size: 15px;
                margin: 0 0 10px 0;
                color: #333;
            }
            
            .popular-search-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .search-tag {
                display: inline-block;
                padding: 6px 12px;
                background-color: #f5f5f5;
                border-radius: 6px;
                color: #333;
                text-decoration: none;
                font-size: 13px;
                transition: all 0.2s ease;
            }
            
            .search-tag:hover {
                background-color: #e0e0e0;
                color: #4721ff;
            }
        `;
        
        document.head.appendChild(styleElement);
    }

    // اجرای تابع افزودن استایل‌های جستجو
    addSearchStyles();
});
// مدیریت مرتب‌سازی محصولات
function setupSortingFunctionality() {
    const sortSelect = document.getElementById("sort-by");
    if (!sortSelect) return;
    
    sortSelect.addEventListener("change", function() {
        // نمایش لودر
        showPageLoadingAnimation();
        
        // دریافت مقدار انتخاب شده
        const selectedSort = this.value;
        
        // شبیه‌سازی مرتب‌سازی محصولات
        setTimeout(() => {
            // اینجا در یک پروژه واقعی، محصولات براساس گزینه انتخابی مرتب می‌شوند
            const products = document.querySelectorAll(".product-card");
            const productsArray = Array.from(products);
            const productsGrid = document.getElementById("products-grid");
            
            if (!productsGrid) return;
            
            // مرتب‌سازی محصولات بر اساس گزینه انتخابی
            productsArray.sort((a, b) => {
                const priceA = getProductPrice(a);
                const priceB = getProductPrice(b);
                
                switch (selectedSort) {
                    case "newest":
                        // در حالت واقعی از تاریخ محصول استفاده می‌شود
                        return (Math.random() - 0.5); // مرتب‌سازی تصادفی برای نمایش
                    case "price-low":
                        return priceA - priceB;
                    case "price-high":
                        return priceB - priceA;
                    case "popular":
                        // در حالت واقعی از امتیاز محبوبیت استفاده می‌شود
                        return (Math.random() - 0.5);
                    case "bestselling":
                        // در حالت واقعی از تعداد فروش استفاده می‌شود
                        return (Math.random() - 0.5);
                    case "discount":
                        const discountA = getProductDiscountPercent(a);
                        const discountB = getProductDiscountPercent(b);
                        return discountB - discountA;
                    default:
                        return 0;
                }
            });
            
            // حذف محصولات فعلی
            while (productsGrid.firstChild) {
                productsGrid.removeChild(productsGrid.firstChild);
            }
            
            // اضافه کردن محصولات مرتب‌شده
            productsArray.forEach(product => {
                productsGrid.appendChild(product);
                
                // افزودن کلاس برای انیمیشن نمایش تدریجی
                setTimeout(() => {
                    product.classList.add("show");
                }, 50 * productsGrid.children.length);
            });
            
            // نمایش پیام موفقیت
            let sortMessage = "";
            switch(selectedSort) {
                case "newest": sortMessage = "جدیدترین"; break;
                case "price-low": sortMessage = "ارزان‌ترین"; break;
                case "price-high": sortMessage = "گران‌ترین"; break;
                case "popular": sortMessage = "محبوب‌ترین"; break;
                case "bestselling": sortMessage = "پرفروش‌ترین"; break;
                case "discount": sortMessage = "بیشترین تخفیف"; break;
            }
            
            showNotification(`محصولات بر اساس ${sortMessage} مرتب شدند`, "success");
        }, 800);
    });
    
    // استخراج قیمت محصول
    function getProductPrice(productCard) {
        const priceElement = productCard.querySelector(".current-price");
        if (!priceElement) return 0;
        
        return parseInt(priceElement.textContent.replace(/[^\d]/g, "")) || 0;
    }
    
    // استخراج درصد تخفیف محصول
    function getProductDiscountPercent(productCard) {
        const discountElement = productCard.querySelector(".discount-percent");
        if (!discountElement) return 0;
        
        return parseInt(discountElement.textContent) || 0;
    }
    
    // اضافه کردن استایل برای انیمیشن مرتب‌سازی
    const sortingStyles = document.createElement("style");
    sortingStyles.textContent = `
        #products-grid {
            position: relative;
        }
        
        .product-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .product-card.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .sort-select-wrapper {
            position: relative;
        }
        
        .sort-select-wrapper::after {
            content: "";
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #666;
            pointer-events: none;
        }
        
        #sort-by {
            padding-left: 25px;
            appearance: none;
            -webkit-appearance: none;
            border: 1px solid #ddd;
            padding: 8px 30px 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            background-color: white;
            cursor: pointer;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        #sort-by:focus {
            outline: none;
            border-color: #4721ff;
            box-shadow: 0 0 0 3px rgba(71, 33, 255, 0.1);
        }
        
        /* نمایش انتخاب فعلی */
        .current-sort {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 13px;
            color: #666;
            margin-right: 10px;
        }
        
        .current-sort::before {
            content: "•";
            color: #4721ff;
        }
    `;
    document.head.appendChild(sortingStyles);
}

// اجرای تنظیمات مرتب‌سازی
document.addEventListener("DOMContentLoaded", function() {
    setupSortingFunctionality();
    
    // برای نمایش انتخاب فعلی مرتب‌سازی
    const sortSelect = document.getElementById("sort-by");
    if (sortSelect) {
        const sortContainer = sortSelect.parentElement;
        const currentSortSpan = document.createElement("span");
        currentSortSpan.className = "current-sort";
        
        // تنظیم متن اولیه
        updateCurrentSortText();
        
        if (sortContainer) {
            sortContainer.appendChild(currentSortSpan);
        }
        
        sortSelect.addEventListener("change", updateCurrentSortText);
        
        function updateCurrentSortText() {
            const selectedOption = sortSelect.options[sortSelect.selectedIndex];
            currentSortSpan.textContent = selectedOption.text;
        }
    }
});
// مدیریت مرتب‌سازی محصولات - نسخه اصلاح‌شده
function setupSortingFunctionality() {
    const sortSelect = document.getElementById("sort-by");
    if (!sortSelect) return;
    
    sortSelect.addEventListener("change", function() {
        // نمایش لودر
        showPageLoadingAnimation();
        
        // دریافت مقدار انتخاب شده
        const selectedSort = this.value;
        
        // شبیه‌سازی مرتب‌سازی محصولات
        setTimeout(() => {
            const products = document.querySelectorAll(".product-card");
            const productsArray = Array.from(products);
            const productsGrid = document.getElementById("products-grid");
            
            if (!productsGrid) return;
            
            // مرتب‌سازی محصولات بر اساس گزینه انتخابی
            productsArray.sort((a, b) => {
                const priceA = getProductPrice(a);
                const priceB = getProductPrice(b);
                
                switch (selectedSort) {
                    case "newest":
                        // در حالت واقعی از تاریخ محصول استفاده می‌شود
                        return (Math.random() - 0.5);
                    case "price-low":
                        return priceA - priceB;
                    case "price-high":
                        return priceB - priceA;
                    case "popular":
                        // در حالت واقعی از امتیاز محبوبیت استفاده می‌شود
                        return (Math.random() - 0.5);
                    case "bestselling":
                        // در حالت واقعی از تعداد فروش استفاده می‌شود
                        return (Math.random() - 0.5);
                    case "discount":
                        const discountA = getProductDiscountPercent(a);
                        const discountB = getProductDiscountPercent(b);
                        return discountB - discountA;
                    default:
                        return 0;
                }
            });
            
            // کپی محصولات قبل از تغییر ساختار DOM
            const clonedProducts = productsArray.map(product => product.cloneNode(true));
            
            // حذف محصولات فعلی
            while (productsGrid.firstChild) {
                productsGrid.removeChild(productsGrid.firstChild);
            }
            
            // اضافه کردن محصولات مرتب‌شده
            clonedProducts.forEach(product => {
                // اطمینان از نمایش محصول
                product.style.opacity = "1";
                product.style.transform = "translateY(0)";
                product.classList.add("show");
                productsGrid.appendChild(product);
            });
            
            // اضافه کردن مجدد رویدادها به محصولات جدید
            attachProductEvents();
            
            // نمایش پیام موفقیت
            let sortMessage = "";
            switch(selectedSort) {
                case "newest": sortMessage = "جدیدترین"; break;
                case "price-low": sortMessage = "ارزان‌ترین"; break;
                case "price-high": sortMessage = "گران‌ترین"; break;
                case "popular": sortMessage = "محبوب‌ترین"; break;
                case "bestselling": sortMessage = "پرفروش‌ترین"; break;
                case "discount": sortMessage = "بیشترین تخفیف"; break;
            }
            
            showNotification(`محصولات بر اساس ${sortMessage} مرتب شدند`, "success");
        }, 800);
    });
    
    // استخراج قیمت محصول
    function getProductPrice(productCard) {
        const priceElement = productCard.querySelector(".current-price");
        if (!priceElement) return 0;
        
        const priceText = priceElement.textContent.trim();
        return parseInt(priceText.replace(/[^\d]/g, "")) || 0;
    }
    
    // استخراج درصد تخفیف محصول
    function getProductDiscountPercent(productCard) {
        const discountElement = productCard.querySelector(".discount-percent");
        if (!discountElement) return 0;
        
        const discountText = discountElement.textContent.trim();
        return parseInt(discountText) || 0;
    }
    
    // اضافه کردن مجدد رویدادها به محصولات مرتب‌شده
    function attachProductEvents() {
        // دکمه‌های افزودن به سبد خرید
        const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
        addToCartBtns.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                
                const productCard = this.closest(".product-card");
                if (!productCard) return;
                
                const productName = productCard.querySelector(".product-name a")?.textContent || "";
                const productPrice = productCard.querySelector(".current-price")?.textContent || "";
                const productImage = productCard.querySelector(".product-image img")?.getAttribute("src") || "";
                const productBrand = productCard.querySelector(".product-brand")?.textContent || "";
                
                // انیمیشن دکمه
                this.classList.add("adding");
                const originalText = this.innerHTML;
                this.innerHTML = `<i class="ri-loader-2-line rotating"></i> افزودن...`;
                
                setTimeout(() => {
                    this.classList.remove("adding");
                    this.innerHTML = `<i class="ri-check-line"></i> افزوده شد`;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 1500);
                }, 800);
                
                showNotification("محصول به سبد خرید اضافه شد", "success");
            });
        });
        
        // دکمه‌های علاقه‌مندی
        const wishlistBtns = document.querySelectorAll(".wishlist-btn");
        wishlistBtns.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                const icon = this.querySelector("i");
                if (!icon) return;
                
                if (icon.classList.contains("ri-heart-line")) {
                    icon.classList.remove("ri-heart-line");
                    icon.classList.add("ri-heart-fill");
                    icon.style.color = "#e91e63";
                    showNotification("محصول به علاقه‌مندی‌ها اضافه شد", "success");
                } else {
                    icon.classList.remove("ri-heart-fill");
                    icon.classList.add("ri-heart-line");
                    icon.style.color = "";
                    showNotification("محصول از علاقه‌مندی‌ها حذف شد", "info");
                }
            });
        });
        
        // دکمه‌های مقایسه
        const compareBtns = document.querySelectorAll(".compare-btn");
        compareBtns.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                const icon = this.querySelector("i");
                if (!icon) return;
                
                if (icon.classList.contains("ri-scales-line")) {
                    icon.classList.remove("ri-scales-line");
                    icon.classList.add("ri-scales-fill");
                    icon.style.color = "#4721ff";
                    showNotification("محصول به لیست مقایسه اضافه شد", "success");
                } else {
                    icon.classList.remove("ri-scales-fill");
                    icon.classList.add("ri-scales-line");
                    icon.style.color = "";
                    showNotification("محصول از لیست مقایسه حذف شد", "info");
                }
            });
        });
    }
}

// اضافه کردن استایل‌های مرتب‌سازی
function addSortingStyles() {
    const sortingStyles = document.createElement("style");
    sortingStyles.textContent = `
        #sort-by {
            padding: 8px 30px 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-family: inherit;
            font-size: 14px;
            background-color: white;
            cursor: pointer;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            -webkit-appearance: none;
            appearance: none;
        }
        
        #sort-by:focus {
            outline: none;
            border-color: #4721ff;
            box-shadow: 0 0 0 3px rgba(71, 33, 255, 0.1);
        }
        
        .sort-select-wrapper {
            position: relative;
            display: inline-block;
        }
        
        .sort-select-wrapper::after {
            content: "";
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #666;
            pointer-events: none;
        }
        
        /* انیمیشن مرتب‌سازی */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .product-card.show {
            animation: fadeInUp 0.3s ease forwards;
        }
    `;
    document.head.appendChild(sortingStyles);
}

// اجرای تنظیمات مرتب‌سازی در زمان آماده شدن صفحه
document.addEventListener("DOMContentLoaded", function() {
    setupSortingFunctionality();
    addSortingStyles();
});
// مدیریت فیلترهای محصولات
function setupFiltersSystem() {
    // متغیرهای عمومی
    const filtersToggle = document.getElementById("filters-toggle");
    const filtersSidebar = document.getElementById("filters-sidebar");
    const closeFilters = document.getElementById("close-filters");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const productsGrid = document.getElementById("products-grid");
    const applyFiltersBtn = document.querySelector(".apply-filters-btn");
    const clearFiltersBtn = document.querySelector(".clear-filters-btn");
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox input");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const colorBtns = document.querySelectorAll(".color-btn");
    const priceFilterBtns = document.querySelectorAll(".price-filter-btn");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const filterSearchInput = document.getElementById("filter-search-input");
    const brandSearchInput = document.getElementById("brand-search");
    const activeFiltersContainer = document.getElementById("active-filters");
    const clearAllFiltersBtn = document.querySelector(".clear-all-filters");

    // مدیریت نمایش/مخفی کردن پنل فیلترها در موبایل
    if (filtersToggle && filtersSidebar && closeFilters && modalBackdrop) {
        filtersToggle.addEventListener("click", function() {
            filtersSidebar.classList.add("active");
            modalBackdrop.classList.add("active");
            document.body.classList.add("no-scroll");
        });
        
        closeFilters.addEventListener("click", function() {
            filtersSidebar.classList.remove("active");
            modalBackdrop.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    }

    // باز/بسته کردن گروه‌های فیلتر
    const filterGroupTitles = document.querySelectorAll(".filter-group-title");
    filterGroupTitles.forEach(title => {
        const toggleBtn = title.querySelector(".toggle-filter");
        if (!toggleBtn) return;
        
        toggleBtn.addEventListener("click", function() {
            const filterGroup = this.closest(".filter-group");
            const filterContent = filterGroup.querySelector(".filter-group-content");
            
            if (filterContent) {
                if (filterContent.style.maxHeight) {
                    filterContent.style.maxHeight = null;
                    this.classList.remove("active");
                    this.querySelector("i").style.transform = "rotate(0deg)";
                } else {
                    filterContent.style.maxHeight = filterContent.scrollHeight + "px";
                    this.classList.add("active");
                    this.querySelector("i").style.transform = "rotate(180deg)";
                }
            }
        });
    });

    // انتخاب سایز
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                this.classList.toggle("active");
                updateActiveFilters();
            });
        });
    }

    // انتخاب رنگ
    if (colorBtns.length > 0) {
        colorBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                this.classList.toggle("active");
                updateActiveFilters();
                
                // نمایش نام رنگ در زمان انتخاب
                const colorName = this.querySelector(".color-name");
                if (colorName) {
                    if (this.classList.contains("active")) {
                        colorName.style.opacity = "1";
                        colorName.style.transform = "translateY(0)";
        setTimeout(() => {
                            colorName.style.opacity = "0";
                            colorName.style.transform = "translateY(10px)";
                        }, 1500);
                    }
                }
            });
        });
    }

    // فیلترهای سریع قیمت
    if (priceFilterBtns.length > 0) {
        priceFilterBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                priceFilterBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                
                // تنظیم محدوده قیمت
                const filterText = this.textContent.trim();
                if (minPriceInput && maxPriceInput) {
                    if (filterText.includes("زیر ۱ میلیون")) {
                        minPriceInput.value = 0;
                        maxPriceInput.value = 1000000;
                    } else if (filterText.includes("۱ تا ۳ میلیون")) {
                        minPriceInput.value = 1000000;
                        maxPriceInput.value = 3000000;
                    } else if (filterText.includes("۳ تا ۵ میلیون")) {
                        minPriceInput.value = 3000000;
                        maxPriceInput.value = 5000000;
                    } else if (filterText.includes("بالای ۵ میلیون")) {
                        minPriceInput.value = 5000000;
                        maxPriceInput.value = 10000000;
                    } else { // حالت "همه قیمت‌ها"
                        minPriceInput.value = 0;
                        maxPriceInput.value = 10000000;
                    }
                }
                
                // به‌روزرسانی فیلترهای فعال
                updateActiveFilters();
                
                // اعمال فوری فیلتر قیمت
                simulateFilteringProducts();
            });
        });
    }

    // مدیریت حالت "نمایش بیشتر" در فیلتر برندها
    const showMoreBtns = document.querySelectorAll(".show-more-btn");
    showMoreBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const filterGroup = this.closest(".filter-group-content");
            const hiddenItems = filterGroup.querySelectorAll(".filter-checkbox.hidden");
            
            if (hiddenItems.length > 0) {
                hiddenItems.forEach(item => {
                    item.classList.remove("hidden");
                });
                this.innerHTML = 'نمایش کمتر <i class="ri-arrow-up-s-line"></i>';
        } else {
                const allItems = filterGroup.querySelectorAll(".filter-checkbox");
                for (let i = 5; i < allItems.length; i++) {
                    allItems[i].classList.add("hidden");
                }
                this.innerHTML = 'مشاهده بیشتر <i class="ri-arrow-down-s-line"></i>';
            }
            
            // تنظیم مجدد ارتفاع محتوای فیلتر
            const filterContent = filterGroup.closest(".filter-group-content");
            if (filterContent && filterContent.style.maxHeight) {
                filterContent.style.maxHeight = filterContent.scrollHeight + "px";
            }
        });
    });

    // جستجو در برندها
    if (brandSearchInput) {
        brandSearchInput.addEventListener("input", function() {
            const searchValue = this.value.trim().toLowerCase();
            const brandCheckboxes = document.querySelectorAll('[id^="brand-"]');
            
            brandCheckboxes.forEach(checkbox => {
                const label = checkbox.nextElementSibling;
                const brandName = label.textContent.toLowerCase();
                const listItem = checkbox.closest(".filter-checkbox");
                
                if (brandName.includes(searchValue)) {
                    listItem.style.display = "";
                    
                    // هایلایت کردن متن جستجو شده
                    if (searchValue) {
                        const regex = new RegExp(`(${searchValue})`, 'i');
                        label.innerHTML = label.textContent.replace(
                            regex, 
                            '<span class="highlight">$1</span>'
                        );
                    } else {
                        label.innerHTML = label.textContent;
                    }
                } else {
                    listItem.style.display = "none";
                }
            });
            
            // تنظیم مجدد ارتفاع محتوای فیلتر
            const filterContent = this.closest(".filter-group-content");
            if (filterContent && filterContent.style.maxHeight) {
                filterContent.style.maxHeight = filterContent.scrollHeight + "px";
            }
        });
    }

    // جستجو در نتایج
    if (filterSearchInput) {
        filterSearchInput.addEventListener("input", function() {
            const searchValue = this.value.trim().toLowerCase();
            
            if (searchValue.length < 2) return; // حداقل 2 کاراکتر
            
            // نمایش لودر
            showPageLoadingAnimation();
            
            // شبیه‌سازی جستجو
            setTimeout(() => {
                const productCards = document.querySelectorAll(".product-card");
                let matchCount = 0;
                
                productCards.forEach(card => {
                    const productName = card.querySelector(".product-name a").textContent.toLowerCase();
                    const productBrand = card.querySelector(".product-brand").textContent.toLowerCase();
                    
                    if (productName.includes(searchValue) || productBrand.includes(searchValue)) {
                        card.style.display = "";
                        matchCount++;
                    } else {
                        card.style.display = "none";
                    }
                });
                
                // به‌روزرسانی تعداد محصولات
                const productsTotal = document.getElementById("products-total");
                if (productsTotal) {
                    productsTotal.textContent = matchCount.toLocaleString('fa-IR');
                }
                
                // نمایش فیلتر فعال جستجو
                if (searchValue.length > 0) {
                    addActiveFilter('جستجو: ' + searchValue, 'search', searchValue);
                } else {
                    removeActiveFilter('search');
                }
                
                showNotification(`${matchCount} محصول یافت شد`, "info");
            }, 600);
        });
    }

    // اعمال فیلترها
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", function() {
            // جمع‌آوری تمام فیلترهای انتخاب شده
            const selectedFilters = collectSelectedFilters();
            
            // نمایش لودر
            showPageLoadingAnimation();
            
            // شبیه‌سازی اعمال فیلترها
            setTimeout(() => {
                // به‌روزرسانی فیلترهای فعال در نوار بالا
                updateActiveFiltersDisplay(selectedFilters);
                
                // بستن سایدبار فیلترها در موبایل
                if (filtersSidebar && modalBackdrop) {
                    filtersSidebar.classList.remove("active");
                    modalBackdrop.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                }
                
                // اعمال فیلترها روی محصولات
                simulateFilteringProducts(selectedFilters);
                
                // نمایش اعلان
                showNotification("فیلترها با موفقیت اعمال شدند", "success");
            }, 800);
        });
    }

    // پاک کردن فیلترها
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", function() {
            // پاک کردن چک‌باکس‌ها
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // پاک کردن سایزها
            sizeBtns.forEach(btn => {
                btn.classList.remove("active");
            });
            
            // پاک کردن رنگ‌ها
            colorBtns.forEach(btn => {
                btn.classList.remove("active");
            });
            
            // بازنشانی محدوده قیمت
            if (minPriceInput && maxPriceInput) {
                minPriceInput.value = 0;
                maxPriceInput.value = 10000000;
            }
            
            // بازنشانی فیلترهای سریع قیمت
            if (priceFilterBtns.length > 0) {
                priceFilterBtns.forEach((btn, index) => {
                    btn.classList.toggle("active", index === 0);
                });
            }
            
            // پاک کردن جستجوها
            if (filterSearchInput) filterSearchInput.value = "";
            if (brandSearchInput) brandSearchInput.value = "";
            
            // به‌روزرسانی فیلترهای فعال
            updateActiveFilters();
            
            showNotification("فیلترها پاک شدند", "info");
        });
    }

    // پاک کردن همه فیلترهای فعال
    if (clearAllFiltersBtn) {
        clearAllFiltersBtn.addEventListener("click", function() {
            // پاک کردن تمام فیلترها
            if (clearFiltersBtn) clearFiltersBtn.click();
            
            // حذف تمام فیلترهای فعال از نوار بالا
            if (activeFiltersContainer) {
                const filterTags = activeFiltersContainer.querySelectorAll(".filter-tag");
                filterTags.forEach(tag => tag.remove());
            }
            
            // نمایش همه محصولات
            const productCards = document.querySelectorAll(".product-card");
            productCards.forEach(card => {
                card.style.display = "";
            });
            
            // به‌روزرسانی تعداد محصولات
            const productsTotal = document.getElementById("products-total");
            if (productsTotal) {
                productsTotal.textContent = productCards.length.toLocaleString('fa-IR');
            }
            
            showNotification("تمام فیلترها پاک شدند", "info");
        });
    }

    // حذف یک فیلتر فعال
    document.addEventListener("click", function(e) {
        if (e.target.closest(".remove-filter")) {
            const filterTag = e.target.closest(".filter-tag");
            if (!filterTag) return;
            
            const filterType = filterTag.dataset.type;
            const filterValue = filterTag.dataset.value;
            
            // حذف فیلتر فعال
            filterTag.remove();
            
            // لغو انتخاب مرتبط در فیلترها
            switch (filterType) {
                case "category":
                case "brand":
                case "feature":
                    const checkbox = document.querySelector(`input[name="${filterType}"][value="${filterValue}"]`);
                    if (checkbox) checkbox.checked = false;
                    break;
                case "size":
                    const sizeBtn = document.querySelector(`.size-btn[data-size="${filterValue}"]`);
                    if (sizeBtn) sizeBtn.classList.remove("active");
                    break;
                case "color":
                    const colorBtn = document.querySelector(`.color-btn[data-color="${filterValue}"]`);
                    if (colorBtn) colorBtn.classList.remove("active");
                    break;
                case "price":
                    // بازنشانی محدوده قیمت
                    if (minPriceInput && maxPriceInput) {
                        minPriceInput.value = 0;
                        maxPriceInput.value = 10000000;
                    }
                    // انتخاب "همه قیمت‌ها"
                    if (priceFilterBtns.length > 0) {
                        priceFilterBtns.forEach((btn, index) => {
                            btn.classList.toggle("active", index === 0);
                        });
                    }
                    break;
                case "search":
                    if (filterSearchInput) filterSearchInput.value = "";
                    break;
            }
            
            // اعمال فیلترها پس از حذف یک فیلتر
            simulateFilteringProducts();
        }
    });

    // جمع‌آوری فیلترهای انتخاب شده
    function collectSelectedFilters() {
        const filters = {
            categories: [],
            brands: [],
            sizes: [],
            colors: [],
            price: {
                min: 0,
                max: 10000000
            },
            features: [],
            search: ""
        };
        
        // دسته‌بندی‌ها
        document.querySelectorAll('input[name="category"]:checked').forEach(cb => {
            filters.categories.push({
                value: cb.value,
                label: cb.nextElementSibling.textContent.trim()
            });
        });
        
        // برندها
        document.querySelectorAll('input[name="brand"]:checked').forEach(cb => {
            filters.brands.push({
                value: cb.value,
                label: cb.nextElementSibling.textContent.trim()
            });
        });
        
        // سایزها
        document.querySelectorAll('.size-btn.active').forEach(btn => {
            filters.sizes.push({
                value: btn.dataset.size,
                label: `سایز ${btn.textContent.trim()}`
            });
        });
        
        // رنگ‌ها
        document.querySelectorAll('.color-btn.active').forEach(btn => {
            const colorName = btn.querySelector('.color-name').textContent.trim();
            filters.colors.push({
                value: btn.dataset.color,
                label: colorName
            });
        });
        
        // محدوده قیمت
        if (minPriceInput && maxPriceInput) {
            filters.price.min = parseInt(minPriceInput.value) || 0;
            filters.price.max = parseInt(maxPriceInput.value) || 10000000;
            
            // اضافه کردن برچسب قیمت فقط اگر غیر از پیش‌فرض باشد
            if (filters.price.min > 0 || filters.price.max < 10000000) {
                filters.priceLabel = `از ${formatPrice(filters.price.min)} تا ${formatPrice(filters.price.max)}`;
            }
        }
        
        // ویژگی‌های خاص
        document.querySelectorAll('input[name="feature"]:checked').forEach(cb => {
            filters.features.push({
                value: cb.value,
                label: cb.nextElementSibling.textContent.trim()
            });
        });
        
        // جستجو
        if (filterSearchInput && filterSearchInput.value.trim()) {
            filters.search = filterSearchInput.value.trim();
        }
        
        return filters;
    }

    // به‌روزرسانی نمایش فیلترهای فعال
    function updateActiveFiltersDisplay(filters) {
        if (!activeFiltersContainer) return;
        
        // پاک کردن فیلترهای فعلی
        activeFiltersContainer.querySelectorAll(".filter-tag").forEach(tag => tag.remove());
        
        // اضافه کردن دسته‌بندی‌ها
        filters.categories.forEach(category => {
            addActiveFilter(category.label, 'category', category.value);
        });
        
        // اضافه کردن برندها
        filters.brands.forEach(brand => {
            addActiveFilter(brand.label, 'brand', brand.value);
        });
        
        // اضافه کردن سایزها
        filters.sizes.forEach(size => {
            addActiveFilter(size.label, 'size', size.value);
        });
        
        // اضافه کردن رنگ‌ها
        filters.colors.forEach(color => {
            addActiveFilter(color.label, 'color', color.value);
        });
        
        // اضافه کردن محدوده قیمت
        if (filters.priceLabel) {
            addActiveFilter(filters.priceLabel, 'price', 'range');
        }
        
        // اضافه کردن ویژگی‌های خاص
        filters.features.forEach(feature => {
            addActiveFilter(feature.label, 'feature', feature.value);
        });
        
        // اضافه کردن جستجو
        if (filters.search) {
            addActiveFilter(`جستجو: ${filters.search}`, 'search', filters.search);
        }
        
        // نمایش/مخفی کردن نوار فیلترهای فعال
        const hasFilters = activeFiltersContainer.querySelectorAll(".filter-tag").length > 0;
        activeFiltersContainer.style.display = hasFilters ? "flex" : "none";
        
        // مخفی/نمایش دکمه پاک کردن همه
        if (clearAllFiltersBtn) {
            clearAllFiltersBtn.style.display = hasFilters ? "inline-flex" : "none";
        }
    }

    // اضافه کردن فیلتر فعال
    function addActiveFilter(label, type, value) {
        if (!activeFiltersContainer) return;
        
        // بررسی تکراری نبودن فیلتر
        const existingFilter = activeFiltersContainer.querySelector(`.filter-tag[data-type="${type}"][data-value="${value}"]`);
        if (existingFilter) return;
        
        const filterTag = document.createElement("span");
        filterTag.className = "filter-tag";
        filterTag.dataset.type = type;
        filterTag.dataset.value = value;
        filterTag.innerHTML = `
            ${label}
            <button class="remove-filter"><i class="ri-close-line"></i></button>
        `;
        
        // اضافه کردن قبل از دکمه "پاک کردن همه"
        const clearBtn = activeFiltersContainer.querySelector(".clear-all-filters");
        if (clearBtn) {
            activeFiltersContainer.insertBefore(filterTag, clearBtn);
        } else {
            activeFiltersContainer.appendChild(filterTag);
        }
        
        // نمایش نوار فیلترهای فعال
        activeFiltersContainer.style.display = "flex";
        
        // نمایش دکمه پاک کردن همه
        if (clearAllFiltersBtn) {
            clearAllFiltersBtn.style.display = "inline-flex";
        }
    }

    // حذف فیلتر فعال
    function removeActiveFilter(type, value = null) {
        if (!activeFiltersContainer) return;
        
        if (value) {
            const filterTag = activeFiltersContainer.querySelector(`.filter-tag[data-type="${type}"][data-value="${value}"]`);
            if (filterTag) filterTag.remove();
        } else {
            activeFiltersContainer.querySelectorAll(`.filter-tag[data-type="${type}"]`).forEach(tag => tag.remove());
        }
        
        // بررسی خالی بودن نوار فیلترها
        const hasFilters = activeFiltersContainer.querySelectorAll(".filter-tag").length > 0;
        activeFiltersContainer.style.display = hasFilters ? "flex" : "none";
        
        // مخفی/نمایش دکمه پاک کردن همه
        if (clearAllFiltersBtn) {
            clearAllFiltersBtn.style.display = hasFilters ? "inline-flex" : "none";
        }
    }

    // به‌روزرسانی فیلترهای فعال
    function updateActiveFilters() {
        const selectedFilters = collectSelectedFilters();
        updateActiveFiltersDisplay(selectedFilters);
    }

    // شبیه‌سازی اعمال فیلترها روی محصولات
    function simulateFilteringProducts(filters = null) {
        if (!filters) {
            filters = collectSelectedFilters();
        }
        
        // نمایش لودر
        showPageLoadingAnimation();
        
        // شبیه‌سازی پردازش فیلترها
        setTimeout(() => {
            let matchCount = 0;
            const productCards = document.querySelectorAll(".product-card");
            
            productCards.forEach(card => {
                // در حالت واقعی، اینجا باید منطق فیلتر کردن محصولات براساس فیلترهای انتخابی اجرا شود
                // این یک شبیه‌سازی ساده است
                
                let shouldShow = true;
                
                // شبیه‌سازی فیلتر دسته‌بندی
                if (filters.categories.length > 0) {
                    // برای نمایش فانکشنالیتی به صورت تصادفی برخی محصولات را فیلتر می‌کنیم
                    if (Math.random() < 0.3) shouldShow = false;
                }
                
                // شبیه‌سازی فیلتر برند
                if (shouldShow && filters.brands.length > 0) {
                    const productBrand = card.querySelector(".product-brand").textContent.trim().toLowerCase();
                    shouldShow = filters.brands.some(brand => 
                        productBrand.toLowerCase().includes(brand.value.toLowerCase())
                    );
                }
                
                // شبیه‌سازی فیلتر جستجو
                if (shouldShow && filters.search) {
                    const productName = card.querySelector(".product-name a").textContent.toLowerCase();
                    const productBrand = card.querySelector(".product-brand").textContent.toLowerCase();
                    shouldShow = productName.includes(filters.search.toLowerCase()) || 
                                 productBrand.includes(filters.search.toLowerCase());
                }
                
                // شبیه‌سازی محدوده قیمت
                if (shouldShow) {
                    const priceElement = card.querySelector(".current-price");
                    if (priceElement) {
                        const price = parseInt(priceElement.textContent.replace(/[^\d]/g, "")) || 0;
                        shouldShow = price >= filters.price.min && price <= filters.price.max;
                    }
                }
                
                // نمایش/مخفی کردن محصول
                card.style.display = shouldShow ? "" : "none";
                
                // شمارش محصولات منطبق
                if (shouldShow) matchCount++;
            });
            
            // به‌روزرسانی تعداد محصولات
            const productsTotal = document.getElementById("products-total");
            if (productsTotal) {
                productsTotal.textContent = matchCount.toLocaleString('fa-IR');
            }
        }, 800);
    }

    // قالب‌بندی قیمت
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " تومان";
    }

    // اضافه کردن استایل‌های پویا
    function addFilterStyles() {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            /* استایل‌های فیلتر */
            .highlight {
                background-color: #ffff88;
                font-weight: bold;
            }
            
            .filter-checkbox.hidden {
                display: none;
            }
            
            .size-btn, .color-btn {
                transition: all 0.2s ease;
            }
            
            .size-btn.active {
                background-color: #4721ff;
                color: white;
                transform: scale(1.05);
            }
            
            .color-btn.active {
                transform: scale(1.1);
                box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4721ff;
            }
            
            .color-name {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(10px);
                background: #333;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                transition: all 0.2s ease;
                pointer-events: none;
            }
            
            .filter-tag {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                background-color: #f5f5f5;
                border-radius: 4px;
                padding: 4px 8px;
                margin-right: 8px;
                margin-bottom: 8px;
                font-size: 13px;
                white-space: nowrap;
                animation: fadeIn 0.3s ease;
            }
            
            .filter-tag .remove-filter {
                border: none;
                background: none;
                color: #999;
                cursor: pointer;
                padding: 0;
                font-size: 16px;
                display: flex;
                align-items: center;
            }
            
            .filter-tag .remove-filter:hover {
                color: #f44336;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
                        /* استایل نوار فیلترهای فعال */
            .active-filters {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-top: 10px;
                padding: 8px 0;
                border-radius: 8px;
                animation: fadeIn 0.3s ease;
            }
            
            .clear-all-filters {
                background-color: #f0f0f0;
                border: none;
                color: #f44336;
                padding: 4px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                margin-right: 8px;
                transition: all 0.2s ease;
            }
            
            .clear-all-filters:hover {
                background-color: #ffe6e6;
            }
            
            /* استایل دکمه‌های فیلتر قیمت سریع */
            .price-quick-filter {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .price-filter-btn {
                border: 1px solid #e0e0e0;
                background-color: #f5f5f5;
                border-radius: 6px;
                padding: 8px 15px;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .price-filter-btn:hover {
                background-color: #e9e9e9;
            }
            
            .price-filter-btn.active {
                background-color: #4721ff;
                color: white;
                border-color: #4721ff;
            }
            
            /* انیمیشن برای فیلتر کردن محصولات */
            @keyframes fade-in-up {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .filter-content-animated {
                animation: fade-in-up 0.3s ease forwards;
            }
        `;
        
        document.head.appendChild(styleElement);
    }

    // افزودن رویدادهای اسلایدر قیمت
    function setupPriceRangeSlider() {
        // اگر کتابخانه اسلایدر (مثل noUiSlider) وجود دارد، می‌توان آن را اینجا پیاده‌سازی کرد
        // فعلاً از ورودی‌های عادی استفاده می‌کنیم
        if (minPriceInput && maxPriceInput) {
            // تبدیل ورودی‌ها به اعداد فارسی
            minPriceInput.addEventListener("input", function() {
                validatePriceRange();
            });
            
            maxPriceInput.addEventListener("input", function() {
                validatePriceRange();
            });
            
            function validatePriceRange() {
                let minPrice = parseInt(minPriceInput.value) || 0;
                let maxPrice = parseInt(maxPriceInput.value) || 10000000;
                
                // حداقل قیمت نباید از حداکثر بیشتر باشد
                if (minPrice > maxPrice) {
                    minPrice = maxPrice;
                    minPriceInput.value = minPrice;
                }
                
                // حداکثر قیمت نباید کمتر از حداقل باشد
                if (maxPrice < minPrice) {
                    maxPrice = minPrice;
                    maxPriceInput.value = maxPrice;
                }
                
                // محدودیت اعداد
                if (minPrice < 0) {
                    minPriceInput.value = 0;
                }
                
                if (maxPrice > 10000000) {
                    maxPriceInput.value = 10000000;
                }
                
                // به‌روزرسانی فیلترهای فعال با تاخیر کوتاه
                clearTimeout(minPriceInput.timer);
                minPriceInput.timer = setTimeout(() => {
                    updateActiveFilters();
                }, 300);
            }
        }
    }

    // راه‌اندازی باز/بسته کردن اولیه گروه‌های فیلتر
    function initializeFilterGroups() {
        // باز کردن گروه‌های اول به صورت پیش‌فرض
        const firstGroups = document.querySelectorAll(".filter-group:nth-child(-n+3) .filter-group-title .toggle-filter");
        firstGroups.forEach(toggle => {
            if (toggle) toggle.click();
        });
    }

    // اجرای توابع اولیه
    addFilterStyles();
    setupPriceRangeSlider();
    initializeFilterGroups();
    updateActiveFilters();
}

// اجرای سیستم فیلترها پس از بارگیری صفحه
document.addEventListener("DOMContentLoaded", function() {
    setupFiltersSystem();
});
/**
 * سیستم مدیریت سبد خرید
 * شامل افزودن محصول، حذف محصول، به‌روزرسانی تعداد و نمایش سبد خرید
 */
function setupShoppingCart() {
    // متغیرهای سراسری
    const cartToggle = document.getElementById("cart-toggle");
    const cartDrawer = document.getElementById("cart-drawer");
    const closeCart = document.getElementById("close-cart");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const continueShopping = document.getElementById("continue-shopping");
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartBadge = document.querySelector(".cart-toggle .badge");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartDiscount = document.getElementById("cart-discount");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const addSuggestionBtns = document.querySelectorAll(".add-suggestion");
    
    // کلید ذخیره‌سازی سبد خرید در localStorage
    const CART_STORAGE_KEY = "amiri_shop_cart";
    
    // باز و بسته کردن پنل سبد خرید
    if (cartToggle && cartDrawer && closeCart && modalBackdrop) {
        cartToggle.addEventListener("click", function() {
            cartDrawer.classList.add("active");
            modalBackdrop.classList.add("active");
            document.body.classList.add("no-scroll");
            
            // به‌روزرسانی محتوای سبد خرید
            updateCartDisplay();
        });
        
        closeCart.addEventListener("click", function() {
            cartDrawer.classList.remove("active");
            modalBackdrop.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
        
        if (continueShopping) {
            continueShopping.addEventListener("click", function() {
                cartDrawer.classList.remove("active");
                modalBackdrop.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        }
    }
    
    // اضافه کردن رویدادها به دکمه‌های افزودن به سبد خرید
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                
                const productCard = this.closest(".product-card");
                if (!productCard) return;
                
                // گرفتن اطلاعات محصول
                const productName = productCard.querySelector(".product-name a").textContent.trim();
                const productPriceText = productCard.querySelector(".current-price").textContent.trim();
                const productImage = productCard.querySelector(".product-image img").getAttribute("src");
                const productBrand = productCard.querySelector(".product-brand").textContent.trim();
                
                // استخراج قیمت به صورت عددی
                const productPrice = convertPersianPriceToNumber(productPriceText);
                
                // جستجوی قیمت قبلی (تخفیف)
                let oldPrice = null;
                const oldPriceElement = productCard.querySelector(".old-price");
                if (oldPriceElement) {
                    oldPrice = convertPersianPriceToNumber(oldPriceElement.textContent.trim());
                }
                
                // تعیین تخفیف محصول
                let discountPercent = 0;
                const discountBadge = productCard.querySelector(".discount-badge");
                if (discountBadge) {
                    discountPercent = parseInt(discountBadge.textContent.replace(/\D/g, "")) || 0;
                }
                
                // افزودن محصول به سبد خرید
                addToCart({
                    id: generateProductId(productName, productBrand),
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    brand: productBrand,
                    oldPrice: oldPrice,
                    discountPercent: discountPercent,
                    quantity: 1
                });
                
                // نمایش انیمیشن افزودن به سبد
                animateAddToCart(this, productImage);
            });
        });
    }
    
    // اضافه کردن رویدادها به دکمه‌های پیشنهاد
    if (addSuggestionBtns.length > 0) {
        addSuggestionBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const suggestionItem = this.closest(".suggestion-item");
                if (!suggestionItem) return;
                
                const productName = suggestionItem.querySelector("h5").textContent.trim();
                const productPrice = convertPersianPriceToNumber(suggestionItem.querySelector(".suggestion-price").textContent.trim());
                const productImage = suggestionItem.querySelector("img").getAttribute("src");
                
                // افزودن محصول پیشنهادی به سبد خرید
                addToCart({
                    id: generateProductId(productName, "پیشنهاد ویژه"),
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    brand: "پیشنهاد ویژه",
                    quantity: 1
                });
                
                // نمایش اعلان
                showNotification("محصول پیشنهادی به سبد خرید اضافه شد", "success");
                
                // انیمیشن دکمه
                this.classList.add("adding");
                const originalText = this.textContent;
                this.textContent = "✓";
                
                setTimeout(() => {
                    this.classList.remove("adding");
                    this.textContent = originalText;
                }, 1500);
            });
        });
    }
    
    /**
     * افزودن محصول به سبد خرید
     * 
     * @param {Object} product - اطلاعات محصول
     */
    function addToCart(product) {
        // دریافت سبد خرید از localStorage
        let cart = getCart();
        
        // بررسی تکراری نبودن محصول
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // افزایش تعداد محصول موجود
            cart[existingItemIndex].quantity += product.quantity;
        } else {
            // افزودن محصول جدید
            cart.push(product);
        }
        
        // ذخیره در localStorage
        saveCart(cart);
        
        // به‌روزرسانی UI سبد خرید
        updateCartBadge();
        updateCartDisplay();
        
        // نمایش اعلان
        showNotification("محصول به سبد خرید اضافه شد", "success");
    }
    
    /**
     * حذف محصول از سبد خرید
     * 
     * @param {string} productId - شناسه محصول
     */
    function removeFromCart(productId) {
        // دریافت سبد خرید
        let cart = getCart();
        
        // حذف محصول از آرایه
        cart = cart.filter(item => item.id !== productId);
        
        // ذخیره تغییرات
        saveCart(cart);
        
        // به‌روزرسانی UI سبد خرید
        updateCartBadge();
        updateCartDisplay();
        
        // نمایش اعلان
        showNotification("محصول از سبد خرید حذف شد", "info");
    }
    
    /**
     * تغییر تعداد محصول در سبد خرید
     * 
     * @param {string} productId - شناسه محصول
     * @param {number} change - میزان تغییر (+1 یا -1)
     */
    function updateCartItemQuantity(productId, change) {
        // دریافت سبد خرید
        let cart = getCart();
        
        // یافتن محصول در سبد
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;
        
        // تغییر تعداد
        cart[itemIndex].quantity += change;
        
        // اگر تعداد صفر یا کمتر شد، محصول را حذف کن
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // ذخیره تغییرات
        saveCart(cart);
        
        // به‌روزرسانی UI سبد خرید
        updateCartBadge();
        updateCartDisplay();
    }
    
    /**
     * دریافت سبد خرید از localStorage
     * 
     * @returns {Array} - آرایه‌ای از محصولات سبد خرید
     */
    function getCart() {
        try {
            const cartData = localStorage.getItem(CART_STORAGE_KEY);
            return cartData ? JSON.parse(cartData) : [];
        } catch (e) {
            console.error("خطا در خواندن سبد خرید:", e);
            return [];
        }
    }
    
    /**
     * ذخیره سبد خرید در localStorage
     * 
     * @param {Array} cart - آرایه‌ای از محصولات سبد خرید
     */
    function saveCart(cart) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error("خطا در ذخیره سبد خرید:", e);
            showNotification("خطا در ذخیره‌سازی سبد خرید. لطفاً مرورگر خود را بررسی کنید.", "error");
        }
    }
    
    /**
     * به‌روزرسانی نمایش سبد خرید
     */
    function updateCartDisplay() {
        if (!cartItemsContainer) return;
        
        // دریافت محتوای سبد خرید
        const cart = getCart();
        
        // خالی کردن کانتینر سبد خرید
        cartItemsContainer.innerHTML = "";
        
        if (cart.length === 0) {
            // نمایش پیام سبد خرید خالی
            if (emptyCartMessage) {
                emptyCartMessage.style.display = "block";
                cartItemsContainer.appendChild(emptyCartMessage);
            } else {
                const emptyMessage = document.createElement("div");
                emptyMessage.className = "empty-cart";
                emptyMessage.textContent = "سبد خرید شما خالی است";
                cartItemsContainer.appendChild(emptyMessage);
            }
            
            // غیرفعال کردن دکمه پرداخت
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
            }
        } else {
            // مخفی کردن پیام سبد خرید خالی
            if (emptyCartMessage) {
                emptyCartMessage.style.display = "none";
            }
            
            // محاسبه مجموع قیمت و تخفیف
            let subtotal = 0;
            let totalDiscount = 0;
            
            // افزودن آیتم‌ها به سبد خرید
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                
                // محاسبه تخفیف محصولات
                if (item.oldPrice) {
                    totalDiscount += (item.oldPrice - item.price) * item.quantity;
                }
                
                // ساخت آیتم سبد خرید
                const cartItemElement = createCartItemElement(item);
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // به‌روزرسانی مقادیر جمع
            if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
            if (cartDiscount) cartDiscount.textContent = formatPrice(totalDiscount);
            if (cartTotal) cartTotal.textContent = formatPrice(subtotal - totalDiscount);
            
            // فعال کردن دکمه پرداخت
            if (checkoutBtn) {
                checkoutBtn.disabled = false;
            }
        }
    }
    
    /**
     * ساخت المان محصول سبد خرید
     * 
     * @param {Object} item - اطلاعات محصول
     * @returns {HTMLElement} - المان محصول
     */
    function createCartItemElement(item) {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.dataset.id = item.id;
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-brand">${item.brand}</div>
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                    ${item.oldPrice ? `<span class="old-price">${formatPrice(item.oldPrice)}</span>` : ''}
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="decrease-qty" aria-label="کاهش تعداد">-</button>
                        <span class="item-qty">${item.quantity}</span>
                        <button class="increase-qty" aria-label="افزایش تعداد">+</button>
                    </div>
                    <button class="remove-item" title="حذف">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        `;
        
        // افزودن رویدادهای مربوط به کنترل‌های محصول
        const decreaseBtn = cartItem.querySelector(".decrease-qty");
        const increaseBtn = cartItem.querySelector(".increase-qty");
        const removeBtn = cartItem.querySelector(".remove-item");
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener("click", function() {
                updateCartItemQuantity(item.id, -1);
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener("click", function() {
                updateCartItemQuantity(item.id, 1);
            });
        }
        
        if (removeBtn) {
            removeBtn.addEventListener("click", function() {
                // اضافه کردن کلاس انیمیشن حذف
                cartItem.classList.add("removing");
                
                // حذف محصول پس از پایان انیمیشن
                setTimeout(() => {
                    removeFromCart(item.id);
                }, 300);
            });
        }
        
        return cartItem;
    }
    
    /**
     * به‌روزرسانی نشانگر تعداد محصولات در سبد خرید
     */
    function updateCartBadge() {
        if (!cartBadge) return;
        
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartBadge.textContent = totalItems;
        
        // نمایش/مخفی کردن نشانگر
        if (totalItems > 0) {
            cartBadge.style.display = "flex";
        } else {
            cartBadge.style.display = "none";
        }
    }
    
    /**
     * نمایش انیمیشن افزودن به سبد خرید
     * 
     * @param {HTMLElement} button - دکمه افزودن به سبد
     * @param {string} productImageSrc - آدرس تصویر محصول
     */
    function animateAddToCart(button, productImageSrc) {
        // انیمیشن دکمه
        button.classList.add("adding");
        const originalButtonHTML = button.innerHTML;
        button.innerHTML = `<i class="ri-loader-2-line rotating"></i> در حال افزودن...`;
        
        // ایجاد یک المان تصویر برای انیمیشن
        const flyingImage = document.createElement("img");
        flyingImage.src = productImageSrc;
        flyingImage.className = "flying-image";
        flyingImage.alt = "محصول";
        
        // استایل اولیه
        Object.assign(flyingImage.style, {
            position: "fixed",
            zIndex: "9999",
            width: "80px",
            height: "80px",
            objectFit: "contain",
            borderRadius: "50%",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            opacity: "0",
            transform: "scale(0.5)"
        });
        
        // پوزیشن اولیه
        const buttonRect = button.getBoundingClientRect();
        flyingImage.style.top = `${buttonRect.top}px`;
        flyingImage.style.left = `${buttonRect.left + buttonRect.width/2 - 40}px`;
        
        document.body.appendChild(flyingImage);
        
        // شروع انیمیشن
        setTimeout(() => {
            flyingImage.style.opacity = "1";
            flyingImage.style.transform = "scale(1)";
        
        setTimeout(() => {
                // مختصات دکمه سبد خرید
                const cartButtonRect = cartToggle.getBoundingClientRect();
                
                // حرکت به سمت سبد خرید
                flyingImage.style.top = `${cartButtonRect.top + cartButtonRect.height/2 - 40}px`;
                flyingImage.style.left = `${cartButtonRect.left + cartButtonRect.width/2 - 40}px`;
                flyingImage.style.transform = "scale(0.3)";
                flyingImage.style.opacity = "0.7";
                
                // حذف المان پس از اتمام انیمیشن
            setTimeout(() => {
                    document.body.removeChild(flyingImage);
                    
                    // انیمیشن دکمه سبد خرید
                    cartToggle.classList.add("pulse");
                    setTimeout(() => {
                        cartToggle.classList.remove("pulse");
                    }, 500);
                    
                    // بازگرداندن دکمه به حالت اولیه
                    button.classList.remove("adding");
                    button.innerHTML = `<i class="ri-check-line"></i> افزوده شد`;
            
            setTimeout(() => {
                        button.innerHTML = originalButtonHTML;
                    }, 1500);
                }, 800);
            }, 200);
        }, 10);
    }
    
    /**
     * تبدیل قیمت متنی به عدد
     * 
     * @param {string} priceText - متن قیمت (مثلا "2,380,000 تومان")
     * @returns {number} - قیمت به صورت عدد
     */
    function convertPersianPriceToNumber(priceText) {
        return parseInt(priceText.replace(/[^\d]/g, "")) || 0;
    }
    
    /**
     * قالب‌بندی قیمت
     * 
     * @param {number} price - مقدار عددی قیمت
     * @returns {string} - قیمت فرمت‌بندی شده
     */
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " تومان";
    }
    
    /**
     * ایجاد شناسه منحصر به فرد برای هر محصول
     * 
     * @param {string} name - نام محصول
     * @param {string} brand - برند محصول
     * @returns {string} - شناسه محصول
     */
    function generateProductId(name, brand) {
        return `${brand}_${name}`.replace(/\s+/g, '_').toLowerCase();
    }
    
    // اضافه کردن استایل‌های پویا برای سبد خرید
    function addCartStyles() {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            /* استایل‌های سبد خرید */
            .cart-drawer {
                transition: transform 0.3s ease, opacity 0.3s ease;
                opacity: 0;
                visibility: hidden;
            }
            
            .cart-drawer.active {
                opacity: 1;
                visibility: visible;
            }
            
            .cart-item {
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .cart-item.removing {
                transform: translateX(-100%);
                opacity: 0;
            }
            
            .quantity-control {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .quantity-control button {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .quantity-control button:hover {
                background-color: #e0e0e0;
            }
            
            .item-qty {
                min-width: 24px;
                text-align: center;
            }
            
            .remove-item {
                background: none;
                border: none;
                color: #f44336;
                cursor: pointer;
                padding: 4px;
                transition: all 0.2s ease;
            }
            
            .remove-item:hover {
                transform: scale(1.2);
            }
            
            .flying-image {
                pointer-events: none;
            }
            
            /* انیمیشن دکمه افزودن به سبد */
            .add-to-cart-btn.adding {
                pointer-events: none;
                opacity: 0.8;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .pulse {
                animation: pulse 0.5s ease;
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .rotating {
                animation: rotate 1s linear infinite;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    // اجرای توابع اولیه
    addCartStyles();
    updateCartBadge();
    updateCheckoutButtonState();
    
    /**
     * به‌روزرسانی وضعیت دکمه پرداخت
     */
    function updateCheckoutButtonState() {
        if (!checkoutBtn) return;
        
        const cart = getCart();
        checkoutBtn.disabled = cart.length === 0;
    }
    
    // افزودن رویداد برای دکمه تکمیل سفارش
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function() {
            if (this.disabled) return;
            
            // نمایش لودر
            showPageLoadingAnimation();
            
            // شبیه‌سازی انتقال به صفحه پرداخت
            setTimeout(() => {
                window.location.href = "checkout.html";
            }, 800);
        });
    }
    
    // رویداد بستن موبایل
    window.addEventListener("resize", function() {
        if (window.innerWidth <= 768 && cartDrawer && cartDrawer.classList.contains("active")) {
            cartDrawer.classList.remove("active");
            modalBackdrop.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
    
    // بازگرداندن متدهای عمومی برای دسترسی از بیرون
    return {
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getCart,
        updateCartDisplay,
        updateCartBadge
    };
}

// راه‌اندازی سیستم سبد خرید پس از بارگیری صفحه
let cartSystem;
document.addEventListener("DOMContentLoaded", function() {
    cartSystem = setupShoppingCart();
});
// skeleton-loader.js - مطابق با ساختار سایت امیری

function createCustomSkeletonLoader() {
    // تنظیم استایل‌های پایه
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }
      
      body.skeleton-loading {
        overflow: hidden;
      }
      
      .skeleton-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        font-family: 'Vazirmatn', sans-serif;
        direction: rtl;
      }
      
      /* هدر - دقیقاً مطابق با ساختار سایت */
      .skeleton-header {
        height: 80px;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        position: relative;
      }
      
      .skeleton-header-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .skeleton-logo {
        width: 150px;
        height: 40px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .skeleton-logo-brand {
        width: 70%;
        height: 22px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-logo-tagline {
        width: 90%;
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-nav {
        display: flex;
        gap: 24px;
        margin-right: auto;
        margin-left: 20px;
      }
      
      .skeleton-nav-item {
        width: 70px;
        height: 12px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-header-actions {
        display: flex;
        gap: 16px;
      }
      
      .skeleton-action-btn {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      /* محتوای اصلی */
      .skeleton-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px 0;
      }
      
      .skeleton-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      /* اسلایدر هدر */
      .skeleton-hero-slider {
        margin-bottom: 40px;
        position: relative;
      }
      
      .skeleton-slide {
        width: 100%;
        height: 350px;
        border-radius: 12px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      /* بخش مزایا */
      .skeleton-features {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .skeleton-feature {
        height: 90px;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        padding: 15px;
        display: flex;
        gap: 10px;
      }
      
      .skeleton-feature-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
        flex-shrink: 0;
      }
      
      .skeleton-feature-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .skeleton-feature-title {
        width: 70%;
        height: 16px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-feature-desc {
        width: 100%;
        height: 10px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      /* بخش دسته‌بندی‌ها */
      .skeleton-categories {
        margin-bottom: 40px;
      }
      
      .skeleton-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      
      .skeleton-section-title {
        width: 200px;
        height: 24px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-view-all {
        width: 80px;
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-categories-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      
      .skeleton-category {
        height: 180px;
        border-radius: 12px;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .skeleton-category-image {
        width: 100%;
        height: 120px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-category-info {
        padding: 12px;
      }
      
      .skeleton-category-title {
        width: 70%;
        height: 16px;
        border-radius: 4px;
        margin-bottom: 8px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-category-count {
        width: 50%;
        height: 12px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      /* بخش محصولات */
      .skeleton-products-section {
        margin-bottom: 40px;
      }
      
      .skeleton-products-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      
      .skeleton-product {
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        overflow: hidden;
      }
      
      .skeleton-product-image {
        width: 100%;
        height: 180px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
        position: relative;
      }
      
      .skeleton-product-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 20px;
        border-radius: 4px;
        background: linear-gradient(90deg, #f3f3f3 8%, #f9f9f9 18%, #f3f3f3 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-product-info {
        padding: 15px;
      }
      
      .skeleton-product-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .skeleton-product-brand {
        width: 50px;
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-product-rating {
        width: 60px;
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-product-title {
        width: 90%;
        height: 16px;
        border-radius: 4px;
        margin-bottom: 15px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-product-price {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      
      .skeleton-current-price {
        width: 60%;
        height: 16px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-old-price {
        width: 30%;
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      .skeleton-add-to-cart {
        width: 100%;
        height: 36px;
        border-radius: 8px;
        background: linear-gradient(90deg, #eee 8%, #f5f5f5 18%, #eee 33%);
        background-size: 800px 104px;
        animation: shimmer 2s infinite linear;
      }
      
      /* واکنش‌گرایی */
      @media (max-width: 992px) {
        .skeleton-features,
        .skeleton-categories-grid,
        .skeleton-products-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (max-width: 768px) {
        .skeleton-nav {
          display: none;
        }
        
        .skeleton-features,
        .skeleton-categories-grid,
        .skeleton-products-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .skeleton-slide {
          height: 280px;
        }
      }
      
      @media (max-width: 576px) {
        .skeleton-features {
          grid-template-columns: 1fr;
        }
        
        .skeleton-categories-grid,
        .skeleton-products-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .skeleton-slide {
          height: 200px;
        }
        
        .skeleton-product-image {
          height: 140px;
        }
      }
    `;
    document.head.appendChild(style);
  
    // ساخت ساختار اسکلتی
    const skeletonScreen = document.createElement('div');
    skeletonScreen.className = 'skeleton-screen';
    
    // ساخت هدر - دقیقاً مطابق با ساختار سایت شما
    const header = document.createElement('div');
    header.className = 'skeleton-header';
    
    const headerContainer = document.createElement('div');
    headerContainer.className = 'skeleton-header-container';
    
    // لوگو - با دو بخش اصلی مطابق سایت
    const logo = document.createElement('div');
    logo.className = 'skeleton-logo';
    
    const logoBrand = document.createElement('div');
    logoBrand.className = 'skeleton-logo-brand';
    
    const logoTagline = document.createElement('div');
    logoTagline.className = 'skeleton-logo-tagline';
    
    logo.appendChild(logoBrand);
    logo.appendChild(logoTagline);
    
    // منوی اصلی
    const nav = document.createElement('div');
    nav.className = 'skeleton-nav';
    
    for (let i = 0; i < 5; i++) {
      const navItem = document.createElement('div');
      navItem.className = 'skeleton-nav-item';
      nav.appendChild(navItem);
    }
    
    // اکشن‌های کاربر
    const headerActions = document.createElement('div');
    headerActions.className = 'skeleton-header-actions';
    
    // دقیقاً 4 اکشن مطابق با سایت
    for (let i = 0; i < 4; i++) {
      const actionBtn = document.createElement('div');
      actionBtn.className = 'skeleton-action-btn';
      headerActions.appendChild(actionBtn);
    }
    
    headerContainer.appendChild(logo);
    headerContainer.appendChild(nav);
    headerContainer.appendChild(headerActions);
    
    header.appendChild(headerContainer);
    skeletonScreen.appendChild(header);
    
    // ساخت محتوا
    const content = document.createElement('div');
    content.className = 'skeleton-content';
    
    const container = document.createElement('div');
    container.className = 'skeleton-container';
    
    // اسلایدر هدر
    const heroSlider = document.createElement('div');
    heroSlider.className = 'skeleton-hero-slider';
    
    const slide = document.createElement('div');
    slide.className = 'skeleton-slide';
    
    heroSlider.appendChild(slide);
    container.appendChild(heroSlider);
    
    // بخش مزایا
    const features = document.createElement('div');
    features.className = 'skeleton-features';
    
    for (let i = 0; i < 4; i++) {
      const feature = document.createElement('div');
      feature.className = 'skeleton-feature';
      
      const featureIcon = document.createElement('div');
      featureIcon.className = 'skeleton-feature-icon';
      
      const featureContent = document.createElement('div');
      featureContent.className = 'skeleton-feature-content';
      
      const featureTitle = document.createElement('div');
      featureTitle.className = 'skeleton-feature-title';
      
      const featureDesc = document.createElement('div');
      featureDesc.className = 'skeleton-feature-desc';
      
      featureContent.appendChild(featureTitle);
      featureContent.appendChild(featureDesc);
      
      feature.appendChild(featureIcon);
      feature.appendChild(featureContent);
      
      features.appendChild(feature);
    }
    
    container.appendChild(features);
    
    // بخش دسته‌بندی‌ها
    const categories = document.createElement('div');
    categories.className = 'skeleton-categories';
    
    const categoriesHeader = document.createElement('div');
    categoriesHeader.className = 'skeleton-section-header';
    
    const categoriesTitle = document.createElement('div');
    categoriesTitle.className = 'skeleton-section-title';
    
    categoriesHeader.appendChild(categoriesTitle);
    categories.appendChild(categoriesHeader);
    
    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'skeleton-categories-grid';
    
    for (let i = 0; i < 4; i++) {
      const category = document.createElement('div');
      category.className = 'skeleton-category';
      
      const categoryImage = document.createElement('div');
      categoryImage.className = 'skeleton-category-image';
      
      const categoryInfo = document.createElement('div');
      categoryInfo.className = 'skeleton-category-info';
      
      const categoryTitle = document.createElement('div');
      categoryTitle.className = 'skeleton-category-title';
      
      const categoryCount = document.createElement('div');
      categoryCount.className = 'skeleton-category-count';
      
      categoryInfo.appendChild(categoryTitle);
      categoryInfo.appendChild(categoryCount);
      
      category.appendChild(categoryImage);
      category.appendChild(categoryInfo);
      
      categoriesGrid.appendChild(category);
    }
    
    categories.appendChild(categoriesGrid);
    container.appendChild(categories);
    
    // بخش محصولات پرفروش
    const productsSection = document.createElement('div');
    productsSection.className = 'skeleton-products-section';
    
    const productsHeader = document.createElement('div');
    productsHeader.className = 'skeleton-section-header';
    
    const productsTitle = document.createElement('div');
    productsTitle.className = 'skeleton-section-title';
    
    const viewAll = document.createElement('div');
    viewAll.className = 'skeleton-view-all';
    
    productsHeader.appendChild(productsTitle);
    productsHeader.appendChild(viewAll);
    
    productsSection.appendChild(productsHeader);
    
    const productsGrid = document.createElement('div');
    productsGrid.className = 'skeleton-products-grid';
    
    for (let i = 0; i < 4; i++) {
      const product = document.createElement('div');
      product.className = 'skeleton-product';
      
      const productImage = document.createElement('div');
      productImage.className = 'skeleton-product-image';
      
      const productBadge = document.createElement('div');
      productBadge.className = 'skeleton-product-badge';
      productImage.appendChild(productBadge);
      
      const productInfo = document.createElement('div');
      productInfo.className = 'skeleton-product-info';
      
      const productMeta = document.createElement('div');
      productMeta.className = 'skeleton-product-meta';
      
      const productBrand = document.createElement('div');
      productBrand.className = 'skeleton-product-brand';
      
      const productRating = document.createElement('div');
      productRating.className = 'skeleton-product-rating';
      
      productMeta.appendChild(productBrand);
      productMeta.appendChild(productRating);
      
      const productTitle = document.createElement('div');
      productTitle.className = 'skeleton-product-title';
      
      const productPrice = document.createElement('div');
      productPrice.className = 'skeleton-product-price';
      
      const currentPrice = document.createElement('div');
      currentPrice.className = 'skeleton-current-price';
      
      const oldPrice = document.createElement('div');
      oldPrice.className = 'skeleton-old-price';
      
      productPrice.appendChild(currentPrice);
      productPrice.appendChild(oldPrice);
      
      const addToCart = document.createElement('div');
      addToCart.className = 'skeleton-add-to-cart';
      
      productInfo.appendChild(productMeta);
      productInfo.appendChild(productTitle);
      productInfo.appendChild(productPrice);
      productInfo.appendChild(addToCart);
      
      product.appendChild(productImage);
      product.appendChild(productInfo);
      
      productsGrid.appendChild(product);
    }
    
    productsSection.appendChild(productsGrid);
    container.appendChild(productsSection);
    
    content.appendChild(container);
    skeletonScreen.appendChild(content);
    
    return skeletonScreen;
  }
  
  // تابع نمایش لودر اسکلتی
  function showCustomSkeletonLoader() {
    document.body.classList.add('skeleton-loading');
    const loader = createCustomSkeletonLoader();
    document.body.prepend(loader);
    
    // حذف لودر
    return {
      hide: function() {
        const loader = document.querySelector('.skeleton-screen');
        if (loader) {
          loader.style.transition = 'opacity 0.6s ease';
          loader.style.opacity = '0';
          
          setTimeout(() => {
            loader.remove();
            document.body.classList.remove('skeleton-loading');
          }, 600);
        }
      }
    };
  }
  
  // نمایش لودر در زمان لود صفحه
  document.addEventListener('DOMContentLoaded', function() {
    const loader = showCustomSkeletonLoader();
    
    // حذف لودر پس از بارگذاری کامل صفحه
    window.addEventListener('load', function() {
      setTimeout(() => {
        loader.hide();
      }, 3000);
    });
    
    // حذف لودر پس از 5 ثانیه (فالبک برای جلوگیری از گیر کردن)
    setTimeout(() => {
      loader.hide();
    }, 3000);
  });
  