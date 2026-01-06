# Admin Panel User Guide - QR Smart Menu App

**Version:** 1.0
**Last Updated:** January 6, 2026

Complete guide for restaurant owners and managers to use the QR Smart Menu admin panel.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Categories](#managing-categories)
4. [Managing Products](#managing-products)
5. [Managing QR Codes](#managing-qr-codes)
6. [Settings](#settings)
7. [Best Practices](#best-practices)
8. [Common Tasks](#common-tasks)
9. [FAQ](#faq)

---

## Getting Started

### Accessing the Admin Panel

1. **Open your browser** and navigate to:
   ```
   https://your-domain.com/admin/login
   ```

2. **Login with your credentials:**
   - Email address
   - Password

3. **Click "Autentificare"** to sign in

### First Login

**Default Admin Credentials:**
- **Email:** `admin@infinitylounge.ro`
- **Password:** `admin123`

**⚠️ Important:** Change your password immediately after first login!

### Changing Your Password

1. Go to **Settings** (Setări)
2. Click on **Profile** tab
3. Enter new password
4. Click **Save Changes**

---

## Dashboard Overview

After logging in, you'll see the main dashboard with:

### Statistics Cards

**Top row shows 4 key metrics:**

1. **Total Categories** (Categorii Totale)
   - Number of active menu categories
   - Click to view all categories

2. **Total Products** (Produse Totale)
   - Number of products in menu
   - Click to view all products

3. **QR Code Scans** (Scanări QR)
   - Total number of menu scans
   - Indicates customer engagement

4. **Popular Items** (Produse Populare)
   - Number of featured products
   - Highlighted items in menu

### Quick Actions

**Shortcut buttons for common tasks:**

- **Add Category** - Create new menu category
- **Add Product** - Add new menu item
- **Create QR Code** - Generate QR code for table
- **View Settings** - Configure venue settings

### Recent Activity

Shows your latest changes:
- Recently added products
- Modified categories
- New QR codes created
- Updated menu items

---

## Managing Categories

Categories organize your menu (e.g., Drinks, Food, Desserts).

### Viewing Categories

1. Click **Categorii** in sidebar
2. See grid of all categories with:
   - Category image
   - Name
   - Number of subcategories
   - Number of products
   - Active/Inactive status

### Creating a Category

1. Click **Add Category** button
2. Fill in the form:

   **Required Fields:**
   - **Name** (Nume): Category name (e.g., "Băuturi")
     - Auto-generates URL slug
   - **Image URL**: Link to category image
     - Use high-quality images (recommended: 1200x800px)

   **Optional Fields:**
   - **Description** (Descriere): Brief category description
     - Shown on category cards

3. Click **Create Category**
4. Success message appears
5. Category added to grid

**Example:**
```
Name: Băuturi
Description: Băuturi răcoritoare și calde
Image URL: https://example.com/drinks.jpg
```

### Editing a Category

1. Find category in grid
2. Click **Edit** button (pencil icon)
3. Update information:
   - Change name
   - Update description
   - Replace image URL
4. Click **Save Changes**
5. Changes reflect immediately in menu

### Deleting a Category

**⚠️ Warning:** Deleting a category is permanent!

1. Click **Delete** button (trash icon) on category
2. Confirm deletion dialog appears
3. Read the warning:
   - "This action cannot be undone"
   - Category can only be deleted if it has no subcategories or products

4. Click **Delete Category** to confirm

**Note:** If category has products, you must:
- Move products to another category, OR
- Delete products first

### Viewing Category on Menu

1. Click **View** button (eye icon) on category
2. Opens category page in new tab
3. See how customers will view this category

---

## Managing Products

Products are the individual menu items (dishes, drinks, etc.).

### Viewing Products

1. Click **Produse** in sidebar
2. See table of all products with:
   - Image thumbnail
   - Name
   - Category
   - Price
   - Availability status
   - Featured status

### Filtering Products

**Search Bar:**
- Type product name to search
- Results filter in real-time

**Filter Buttons:**
- **All** - Show all products
- **Available** - Only available items
- **Unavailable** - Only unavailable items

**Category Filter:**
- Dropdown to filter by category
- Shows products in selected category only

### Creating a Product

1. Click **Add Product** button
2. Fill in comprehensive form:

   **Basic Information:**
   - **Name** (Nume)* - Product name (e.g., "Espresso")
   - **Description** (Descriere) - Product details
   - **Price** (Preț)* - Current price in RON
   - **Old Price** (Preț vechi) - For showing discounts
   - **Image URL** - Product photo link
   - **Quantity** (Cantitate) - Serving size (e.g., "250ml", "100g")

   **Organization:**
   - **Category** (Categorie)* - Select main category
   - **Subcategory** (Subcategorie) - Optional subcategory
     - Filtered based on selected category

   **Allergens** (Alergeni):
   Check applicable allergens:
   - Gluten
   - Lactose (Lactoză)
   - Eggs (Ouă)
   - Fish (Pește)
   - Soy (Soia)
   - Nuts (Nuci)
   - Peanuts (Arahide)
   - Shellfish (Crustacee)

   **Status Options:**
   - **Featured** (Recomandat) - Highlight as popular item
   - **Available** (Disponibil) - Currently in stock

3. Click **Create Product**
4. Product appears in menu

**Example:**
```
Name: Espresso
Description: Cafea espresso intensă, 100% Arabica
Price: 8.50
Old Price: 10.00 (shows -15% discount)
Quantity: 30ml
Category: Băuturi
Subcategory: Cafea
Allergens: None
Featured: Yes
Available: Yes
```

### Editing a Product

1. Find product in table
2. Click **Edit** button (pencil icon)
3. Form opens with current values
4. Modify any field
5. Click **Save Changes**

**Common edits:**
- Update prices
- Change availability
- Add/remove from featured
- Update description
- Change allergens

### Deleting a Product

1. Click **Delete** button (trash icon)
2. Confirm deletion dialog appears
3. Click **Delete Product**
4. Product removed from menu

**Note:** Deleted products cannot be recovered!

### Managing Availability

**Quick toggle:**
- Products can be marked as unavailable without deleting
- Unavailable products show in menu as "Indisponibil"
- Grayed out with overlay
- Useful for temporarily out-of-stock items

**To mark unavailable:**
1. Edit product
2. Uncheck **Available** checkbox
3. Save changes

### Understanding Discounts

**Automatic discount calculation:**
- If **Old Price** > **Current Price**:
  - Discount % shown on product card
  - Old price displayed with strikethrough
  - Attracts customer attention

**Example:**
```
Current Price: 25 RON
Old Price: 30 RON
Result: Shows "-17%" badge
```

---

## Managing QR Codes

QR codes link physical locations (tables, bar) to your digital menu.

### Viewing QR Codes

1. Click **Coduri QR** in sidebar
2. See grid of QR codes with:
   - Live QR code preview
   - Name and location
   - Scan count
   - Last scan time
   - Active status

### Creating a QR Code

1. Click **Create QR Code** button
2. Fill in form:

   **Required Fields:**
   - **Name** (Nume)* - Identifier (e.g., "Masa 1", "Bar Counter")
   - **Location** (Locație)* - Physical location
     - Used for tracking where scans come from

   **Optional Fields:**
   - **Custom URL** - Override auto-generated URL
     - Leave empty for automatic URL
   - **Active** (Activ) - Track scans (checked by default)

3. **Live Preview** shows QR code as you type
4. Click **Create QR Code**
5. QR code ready to download

**Auto-Generated URL:**
```
Format: https://your-domain.com?qr=location-name
Example: https://infinitylounge.ro?qr=masa-1
```

**Example:**
```
Name: Masa 1
Location: Sala principală
Custom URL: (leave empty)
Active: Yes
```

### Downloading QR Codes

**For printing:**

1. Click **View** on QR code
2. Modal opens with large preview
3. Click download button:
   - **Download PNG** - For printing (1024x1024px)
   - **Download SVG** - For scaling/editing

**Recommended:**
- Use PNG for most printing
- Print at minimum 5cm x 5cm size
- Ensure high contrast (black QR on white background)

### Viewing QR Code Statistics

**Each QR code shows:**
- **Scans** - Total number of times scanned
- **Last Scanned** - Date and time of most recent scan
- **Active/Inactive** - Whether tracking is enabled

**Use statistics to:**
- Identify popular table locations
- Track customer engagement
- Optimize table placement

### Editing a QR Code

1. Click **Edit** button on QR code
2. Update information:
   - Change name or location
   - Modify custom URL
   - Toggle active status
3. Preview updates in real-time
4. Click **Save Changes**

**Note:** Changing location generates new URL!

### Deleting a QR Code

**⚠️ Warning:** Deleting loses all scan statistics!

1. Click **Delete** button
2. Confirm deletion
3. QR code removed

**Best practice:**
- Mark as inactive instead of deleting
- Preserves historical scan data

### Printing QR Codes

**Recommended printing:**

1. Download PNG (1024x1024px)
2. Use photo paper or laminated cards
3. Minimum size: 5cm x 5cm
4. Test scan before distributing
5. Place in visible, accessible locations

**Placement tips:**
- Table tents (tent cards on tables)
- Wall-mounted frames
- Menu covers
- Table stickers
- Entrance signage

---

## Settings

Configure venue information and admin preferences.

### Venue Information

**Company Details:**
- Restaurant name
- Address
- Phone number
- Email
- Description

**Used for:**
- Display on menu pages
- Contact information
- Meta tags and SEO

### Profile Settings

**Admin Account:**
- Change your name
- Update email address
- Modify password

### Password Security

**Update Password:**
1. Go to Settings → Profile
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click **Change Password**

**Password Requirements:**
- Minimum 8 characters
- Use combination of letters and numbers
- Avoid common passwords

### Branding

**Customize appearance:**
- Upload logo
- Set primary color
- Set secondary color
- Choose font style

**Note:** Branding customization coming in future updates.

### Language

**Current:** Romanian (RO)
**Coming Soon:** English (EN)

Multi-language support in development.

---

## Best Practices

### Image Guidelines

**Category Images:**
- **Size:** 1200x800px (16:9 ratio)
- **Format:** JPG or PNG
- **Quality:** High resolution, well-lit
- **Content:** Representative of category
- **File size:** < 500KB (optimized)

**Product Images:**
- **Size:** 800x800px (square)
- **Format:** JPG or PNG
- **Quality:** Professional food photography
- **Background:** Clean, neutral
- **Lighting:** Natural, appealing
- **File size:** < 300KB

**QR Code Placement:**
- High-quality print
- Protected from damage (laminated)
- Good lighting
- Easy customer access
- Clear instructions nearby

### Organizing Your Menu

**Category Structure:**
```
Băuturi
├── Cafea
├── Ceaiuri
└── Răcoritoare

Mâncare
├── Aperitive
├── Feluri principale
└── Garnituri

Deserturi
├── Prăjituri
└── Înghețată
```

**Tips:**
- Keep categories focused
- Use clear, descriptive names
- Limit subcategories to 2-3 levels
- Group similar items together

### Pricing Strategy

**Tips for effective pricing:**

1. **Competitive Pricing:**
   - Research local competitors
   - Match or differentiate appropriately

2. **Psychological Pricing:**
   - Use .99 or .50 endings (e.g., 9.99, 12.50)
   - Round numbers for premium items

3. **Discounts:**
   - Use "Old Price" for promotions
   - Highlight special offers
   - Time-limited deals

4. **Featured Items:**
   - Mark best sellers
   - Promote high-margin items
   - Seasonal specials

### Menu Updates

**Regular maintenance:**

- **Daily:** Check product availability
- **Weekly:** Update featured items
- **Monthly:** Review and refresh images
- **Seasonally:** Add seasonal items, update categories

**Before busy periods:**
- Verify all products available
- Update prices if needed
- Test QR codes
- Check menu displays correctly

---

## Common Tasks

### How to Add a New Seasonal Menu

1. **Create new category:**
   - Name: "Meniu de Vară" (Summer Menu)
   - Add attractive seasonal image
   - Write appealing description

2. **Add seasonal products:**
   - Create products in new category
   - Mark as featured
   - Use competitive pricing

3. **Generate QR codes:**
   - Create QR for promotional materials
   - Download and print

4. **Promote:**
   - Place QR codes at entrance
   - Update social media
   - Train staff on new items

### How to Run a Promotion

**Example: 20% off all desserts**

1. **Edit each dessert product:**
   - Set "Old Price" to current price
   - Reduce "Price" by 20%
   - System shows "-20%" badge

2. **Feature promotion:**
   - Mark desserts as "Featured"
   - Customers see special highlighting

3. **Track results:**
   - Monitor QR scan statistics
   - Check which desserts most popular

4. **End promotion:**
   - Edit products again
   - Remove old price
   - Restore regular pricing

### How to Handle Out-of-Stock Items

**Don't delete products!**

1. **Mark as unavailable:**
   - Edit product
   - Uncheck "Available"
   - Save changes

2. **Product shows as:**
   - Grayed out image
   - "Indisponibil" label
   - Still visible but not orderable

3. **When back in stock:**
   - Edit product
   - Check "Available"
   - Save changes

### How to Highlight Bestsellers

1. **Identify top products:**
   - Check QR scan statistics
   - Review sales data
   - Ask staff for feedback

2. **Mark as featured:**
   - Edit each popular product
   - Check "Featured" checkbox
   - Save changes

3. **Products show:**
   - "⭐ Popular" badge
   - Highlighted in listings
   - More visibility to customers

### How to Update Allergen Information

**Very important for customer safety!**

1. **Review product ingredients:**
   - Check with kitchen staff
   - Verify all allergens

2. **Edit product:**
   - Check all applicable allergens
   - Common allergens:
     - Gluten (wheat, bread, pasta)
     - Lactose (milk, cheese, cream)
     - Eggs (desserts, sauces)
     - Nuts (desserts, salads)

3. **Save and verify:**
   - Allergen icons show on product card
   - Full list in product details

**Note:** Always err on the side of caution!

---

## FAQ

### General Questions

**Q: Can I use the admin panel on my phone?**

A: Yes! The admin panel is fully responsive and works on phones, tablets, and computers.

**Q: How many admins can we have?**

A: Currently supports one admin account per venue. Multi-admin support coming soon.

**Q: Can customers order through the menu?**

A: Version 1.0 is a digital menu only. Online ordering coming in future updates.

**Q: What languages are supported?**

A: Currently Romanian (RO). English support in development.

### Categories & Products

**Q: How many categories can I have?**

A: No limit! Create as many as needed to organize your menu.

**Q: Can I reorder categories?**

A: Category ordering coming in future update. Currently alphabetical.

**Q: What if I don't have product images?**

A: Use placeholder images temporarily. Professional photos highly recommended for better customer experience.

**Q: Can I import products from Excel?**

A: Not yet. Bulk import feature planned for future version.

### QR Codes

**Q: Do QR codes expire?**

A: No! QR codes work indefinitely as long as your website is active.

**Q: Can I edit a QR code after printing?**

A: You can edit the name and location, but this changes the tracking URL. The physical QR code still works.

**Q: How do I track which table customers scan from?**

A: Each QR code tracks scans separately. Create one QR code per table/location.

**Q: What if QR code doesn't scan?**

A: Ensure:
- Good print quality
- Adequate size (minimum 5cm)
- Clean, undamaged surface
- Good lighting
- Test with multiple devices

### Technical

**Q: What browsers are supported?**

A: Modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Q: Can I edit the menu offline?**

A: No, requires internet connection.

**Q: How often is the menu updated?**

A: Changes appear immediately for customers.

**Q: Is customer data collected?**

A: Only anonymous QR scan statistics (count, timestamp). No personal data.

### Pricing & Images

**Q: What currency is supported?**

A: Romanian Lei (RON). Symbol: "lei" or "RON".

**Q: Can I show prices in Euros?**

A: Not currently. Single currency per venue.

**Q: Where should I host images?**

A: Options:
- Cloudinary (recommended)
- Your own server
- Image hosting services
- Ensure images publicly accessible

**Q: Can I upload images directly?**

A: Coming soon! Currently using image URLs.

---

## Getting Help

### Support Resources

1. **Documentation:**
   - [API Documentation](./API_DOCUMENTATION.md)
   - [Deployment Guide](./DEPLOYMENT.md)
   - [Component Guide](./COMPONENTS.md)

2. **Contact Support:**
   - Email: support@your-domain.com
   - Response time: 24-48 hours

3. **Report Issues:**
   - GitHub Issues (for technical team)

### Tips for Better Support

**When contacting support, include:**
- What you were trying to do
- What happened instead
- Error messages (screenshot)
- Browser and device used
- Steps to reproduce issue

---

## Quick Reference

### Common Keyboard Shortcuts

- **ESC** - Close modals/dialogs
- **Ctrl/Cmd + S** - Save forms (in some browsers)
- **Ctrl/Cmd + F** - Search on page

### Status Icons

- 🟢 **Green** - Active, available
- 🔴 **Red** - Inactive, unavailable
- ⭐ **Star** - Featured item
- 📊 **Chart** - Statistics available

### Admin Panel Pages

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin/login` | Sign in |
| Dashboard | `/admin/dashboard` | Overview & stats |
| Categories | `/admin/categories` | Manage categories |
| Products | `/admin/products` | Manage products |
| QR Codes | `/admin/qr-codes` | Manage QR codes |
| Settings | `/admin/settings` | Configuration |

---

## Conclusion

This guide covers all essential admin panel functions for managing your digital menu.

**Remember:**
- Make regular updates to keep menu fresh
- Check product availability daily
- Test QR codes periodically
- Keep high-quality images
- Monitor scan statistics
- Highlight your best items

**For additional help, refer to technical documentation or contact support.**

**Happy managing! 🍽️**

---

**Version 1.0 - INFINITY LOUNGE QR Smart Menu App**
