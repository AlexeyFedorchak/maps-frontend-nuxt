export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const tokenResponse = await $fetch('https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: config.trustpilotApiKey,
        client_secret: config.trustpilotSecret,
      }),
    })

    const accessToken = tokenResponse.access_token

    // Get business unit reviews
    const businessUnitId = config.public.trustpilotBusinessUnitId
    
    if (!businessUnitId) {
      throw new Error('Business Unit ID not configured')
    }
    const reviewsResponse = await $fetch(`https://api.trustpilot.com/v1/business-units/${businessUnitId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      query: {
        perPage: 10,
        orderBy: 'createdat.desc'
      }
    })

    // Transform reviews to our format
    const transformedReviews = reviewsResponse.reviews.map((review, index) => ({
      id: review.id || String(index),
      title: review.title || 'Best on the market',
      content: review.text || 'I love this product because the support is great.',
      rating: review.stars || 5,
      reviewer: review.consumer?.displayName || 'Anonymous',
      timeAgo: getTimeAgo(review.createdAt),
      verifiedPurchase: review.verifiedByTrustpilot || false
    }))

    return {
      success: true,
      reviews: transformedReviews,
      totalReviews: reviewsResponse.totalCount || 0
    }

  } catch (error) {
    console.error('Trustpilot API Error:', error)
    
    // Fallback to mock data if API fails
    const mockReviews = [
      {
        id: '1',
        title: 'Best on the market',
        content: 'I love this product because the support is great. Please consider using this service for your business needs.',
        rating: 5,
        reviewer: 'Sarah Johnson',
        timeAgo: '2 days ago',
        verifiedPurchase: true
      },
      {
        id: '2', 
        title: 'Amazing quality',
        content: 'I love this product because the support is great. The quality exceeded my expectations and delivery was fast.',
        rating: 5,
        reviewer: 'Michael Chen',
        timeAgo: '3 days ago',
        verifiedPurchase: true
      },
      {
        id: '3',
        title: 'Perfect gift', 
        content: 'I love this product because the support is great. Amazing customer service and beautiful final product.',
        rating: 5,
        reviewer: 'Emma Wilson',
        timeAgo: '1 week ago',
        verifiedPurchase: true
      },
      {
        id: '4',
        title: 'Fast delivery',
        content: 'I love this product because the support is great. Fast shipping and excellent communication throughout.',
        rating: 5,
        reviewer: 'David Brown',
        timeAgo: '1 week ago',
        verifiedPurchase: true
      },
      {
        id: '5',
        title: 'Highly recommend',
        content: 'I love this product because the support is great. Perfect gift for anniversary, highly recommend!',
        rating: 5,
        reviewer: 'Lisa Garcia',
        timeAgo: '2 weeks ago',
        verifiedPurchase: true
      },
      {
        id: '6',
        title: 'Beautiful design',
        content: 'I love this product because the support is great. Beautiful design and great customer experience.',
        rating: 5,
        reviewer: 'James Miller',
        timeAgo: '2 weeks ago',
        verifiedPurchase: true
      }
    ]

    return {
      success: false,
      reviews: mockReviews,
      totalReviews: mockReviews.length,
      error: 'Using fallback data'
    }
  }
})

// Helper function to calculate time ago
function getTimeAgo(dateString) {
  if (!dateString) return '2 days ago'
  
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}
