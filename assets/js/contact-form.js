/**
 * Contact Form Handler using mailto protocol
 * This script handles the contact form submission without requiring any API keys
 */

// Contact form configuration
(function() {
  "use strict";
  
  // Get all forms with the php-email-form class
  let forms = document.querySelectorAll('.php-email-form');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let thisForm = this;
      
      // Show loading indicator
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
      
      // Get form data
      const name = thisForm.querySelector('input[name="name"]').value;
      const email = thisForm.querySelector('input[name="email"]').value;
      const subject = thisForm.querySelector('input[name="subject"]').value;
      const message = thisForm.querySelector('textarea[name="message"]').value;
      const to_email = 'd.j.seal369@gmail.com';
      
      try {
        // Format the message body with proper line breaks
        // This ensures the textarea content is properly formatted in the email
        const formattedBody = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // Create a mailto link that opens the user's email client
        // Using encodeURIComponent to properly handle special characters and line breaks
        const mailtoLink = `mailto:${to_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
        
        // Open the mailto link in a new window
        window.open(mailtoLink, '_blank');
        
        // Show success message
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.querySelector('.sent-message').innerHTML = 'Your email client has been opened. Please send the email to complete the process.';
        thisForm.reset();
      } catch (error) {
        displayError(thisForm, 'An error occurred while preparing the email. Please try again.');
      }
    });
  });
  
  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
})();