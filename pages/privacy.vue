<script setup lang="ts">
  import useUserSelection from '@/composables/useUserSelection.js';


  // === Composables ===
  const userSelection = useUserSelection();


  // === Data ===
  const currentDomainName = process.client ? window?.location?.hostname : '';


  userSelection.setPageMetaDescription('Privacy Policy');
  userSelection.setPageTitle(`Privacy Policy | ${userSelection.appTitle.value}`);
</script>

<template>
  <VRow class="footer-border-bottom">
    <VCol class="py-8 px-10 text-justify">
      <h2>Privacy Policy</h2>

      <p>Effective Date: Aug 1st, 2023</p>

      <p>Thank you for visiting {{ currentDomainName }} (the "Website"). Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect when you use our Website and how we may use, store, and share such information. By accessing and using the Website, you consent to the practices described in this policy.</p>

      <h3>Information Collection and Use</h3>

      <h4>Personal Information</h4>

      <p>When you use our Website, we may collect certain personally identifiable information, such as:</p>

      <ol>
        <li>Name: We may collect your name when you provide it voluntarily, for example, when leaving comments or contacting us through the provided contact form.</li>

        <li>Email Address: We may collect your email address when you subscribe to our newsletter or contact us.</li>
      </ol>

      <h4>Non-Personal Information</h4>

      <p>We also collect non-personal information automatically as you interact with our Website. This information may include:</p>

      <ol>
        <li>Log Data: We may collect information that your browser sends whenever you visit our Website ("Log Data"). This Log Data may include your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our Website that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</li>

        <li>Cookies: We use cookies and similar tracking technologies to enhance your experience on the Website. Cookies are small data files that are placed on your computer or device and often include an anonymous unique identifier. You can modify your browser settings to control cookies or notify you when a cookie is being sent.</li>
      </ol>

      <h3>Use of Information</h3>

      <p>We use the information collected from you for various purposes, including:</p>

      <ul>
        <li>To provide and maintain the Website;</li>
        <li>To respond to your inquiries or comments;</li>
        <li>To send you updates, newsletters, or other information you subscribed to receive;</li>
        <li>To analyze and improve the Website's content, performance, and user experience;</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h3>Third-Party Services</h3>

      <p>Our Website may use third-party services, including but not limited to Google Analytics, Google AdSense, and Amazon Affiliate links. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address. Each third-party service has its own privacy policy, which governs how they handle your information. We encourage you to review their privacy policies to understand their practices.</p>

      <h3>Data Security</h3>

      <p>We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the internet or storage system can be guaranteed to be completely secure. Therefore, while we strive to protect your personal information, we cannot guarantee its absolute security.</p>

      <h3>Links to Other Sites</h3>

      <p>Our Website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

      <h3>Children's Privacy</h3>

      <p>We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will take appropriate measures to remove the information.</p>

      <h3>Changes to this Privacy Policy</h3>

      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the updated Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. The "Effective Date" at the top of this page indicates when the Privacy Policy was last revised.</p>

      <h3>Contact Us</h3>

      <p>If you have any questions or concerns about this Privacy Policy, please contact us at privacy@ivan-lim.com</p>
    </VCol>
  </VRow>
</template>

<style scoped>
li, p {
  margin: 20px 0px;
}

li {
  margin-left: 20px;
}
</style>