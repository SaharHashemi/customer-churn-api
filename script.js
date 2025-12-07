document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const resultSection = document.getElementById('resultSection');
    const errorSection = document.getElementById('errorSection');
    const jsonInput = document.getElementById('jsonInput');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous results
        resultSection.style.display = 'none';
        errorSection.style.display = 'none';
        
        // Disable submit button and show loading
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.innerHTML = 'Predicting... <span class="loading"></span>';
        
        try {
            // Parse JSON input
            let customerData;
            try {
                customerData = JSON.parse(jsonInput.value);
            } catch (parseError) {
                throw new Error('Invalid JSON format. Please check your input.');
            }
            
            // Make API request
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: customerData
                })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Display results
                document.getElementById('teacherPred').textContent = result.teacher_model_prediction;
                document.getElementById('riskPred').textContent = result.risk_model_prediction.toFixed(4);
                
                const statusBadge = document.getElementById('statusBadge');
                statusBadge.textContent = '✓ Prediction Successful';
                statusBadge.className = 'status-badge success';
                
                resultSection.style.display = 'block';
                errorSection.style.display = 'none';
            } else {
                // Display error
                document.getElementById('errorMessage').textContent = result.error || 'An error occurred during prediction.';
                errorSection.style.display = 'block';
                resultSection.style.display = 'none';
            }
        } catch (error) {
            // Display error
            document.getElementById('errorMessage').textContent = error.message || 'An unexpected error occurred.';
            errorSection.style.display = 'block';
            resultSection.style.display = 'none';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
    
    // Add example JSON on focus
    jsonInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = 'Example: {"feature1": 1, "feature2": 0.5, "feature3": "value"}';
        }
    });
});

