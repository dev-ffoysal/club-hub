'use client'

import { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Button } from '../../../../../components/ui/button'
import { Textarea } from '../../../../../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs'
import { Plus, X, Users, Award, Building, HelpCircle, FileText, CheckCircle } from 'lucide-react'

interface AdditionalInfoStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (updates: any) => void
}

export function AdditionalInfoStep({ formData, errors, updateFormData }: AdditionalInfoStepProps) {
  // Helper function to add items to arrays
  const addItem = (field: string, newItem: any) => {
    const currentItems = formData[field] || []
    updateFormData({ [field]: [...currentItems, newItem] })
  }

  // Helper function to remove items from arrays
  const removeItem = (field: string, index: number) => {
    const currentItems = formData[field] || []
    const updatedItems = currentItems.filter((_: any, i: number) => i !== index)
    updateFormData({ [field]: updatedItems })
  }

  // Helper function to update items in arrays
  const updateItem = (field: string, index: number, updates: any) => {
    const currentItems = formData[field] || []
    const updatedItems = currentItems.map((item: any, i: number) => 
      i === index ? { ...item, ...updates } : item
    )
    updateFormData({ [field]: updatedItems })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="help">Help & FAQ</TabsTrigger>
        </TabsList>

        {/* People Tab - Hosts and Guests */}
        <TabsContent value="people" className="space-y-6">
          {/* Hosts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Event Hosts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.host || []).map((host: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Host {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('host', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={host.name || ''}
                        onChange={(e) => updateItem('host', index, { name: e.target.value })}
                        placeholder="Host name"
                      />
                    </div>
                    <div>
                      <Label>Designation</Label>
                      <Input
                        value={host.designation || ''}
                        onChange={(e) => updateItem('host', index, { designation: e.target.value })}
                        placeholder="e.g., CEO, Professor"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={host.position || ''}
                        onChange={(e) => updateItem('host', index, { position: e.target.value })}
                        placeholder="e.g., Keynote Speaker"
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={host.image || ''}
                        onChange={(e) => updateItem('host', index, { image: e.target.value })}
                        placeholder="Profile image URL"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('host', { name: '', designation: '', position: '', image: '' })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Host
              </Button>
            </CardContent>
          </Card>

          {/* Guests Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Special Guests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.guests || []).map((guest: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Guest {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('guests', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={guest.name || ''}
                        onChange={(e) => updateItem('guests', index, { name: e.target.value })}
                        placeholder="Guest name"
                      />
                    </div>
                    <div>
                      <Label>Designation</Label>
                      <Input
                        value={guest.designation || ''}
                        onChange={(e) => updateItem('guests', index, { designation: e.target.value })}
                        placeholder="e.g., Industry Expert"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={guest.position || ''}
                        onChange={(e) => updateItem('guests', index, { position: e.target.value })}
                        placeholder="e.g., Panel Speaker"
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={guest.image || ''}
                        onChange={(e) => updateItem('guests', index, { image: e.target.value })}
                        placeholder="Profile image URL"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('guests', { name: '', designation: '', position: '', image: '' })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab - Prizes, Benefits, Requirements */}
        <TabsContent value="details" className="space-y-6">
          {/* Winning Prizes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Winning Prizes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.winningPrize || []).map((prize: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Prize {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('winningPrize', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={prize.title || ''}
                        onChange={(e) => updateItem('winningPrize', index, { title: e.target.value })}
                        placeholder="e.g., First Prize"
                      />
                    </div>
                    <div>
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={prize.amount || ''}
                        onChange={(e) => updateItem('winningPrize', index, { amount: parseFloat(e.target.value) || 0 })}
                        placeholder="Prize amount"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        type="number"
                        value={prize.position || ''}
                        onChange={(e) => updateItem('winningPrize', index, { position: parseInt(e.target.value) || 1 })}
                        placeholder="1, 2, 3..."
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={prize.description || ''}
                      onChange={(e) => updateItem('winningPrize', index, { description: e.target.value })}
                      placeholder="Prize description"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('winningPrize', { title: '', description: '', amount: 0, position: 1 })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Prize
              </Button>
            </CardContent>
          </Card>

          {/* Benefits, Requirements, Rules, Eligibility */}
          {['benefits', 'requirements', 'rules', 'eligibility'].map((section) => (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  <CheckCircle className="w-5 h-5" />
                  {section}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(formData[section] || []).map((item: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium capitalize">{section.slice(0, -1)} {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(section, index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={item.title || ''}
                        onChange={(e) => updateItem(section, index, { title: e.target.value })}
                        placeholder={`${section.slice(0, -1)} title`}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={item.description || ''}
                        onChange={(e) => updateItem(section, index, { description: e.target.value })}
                        placeholder={`${section.slice(0, -1)} description`}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Criteria</Label>
                      <div className="space-y-2">
                        {(item.criteria || []).map((criterion: string, criterionIndex: number) => (
                          <div key={criterionIndex} className="flex gap-2">
                            <Input
                              value={criterion}
                              onChange={(e) => {
                                const updatedCriteria = [...(item.criteria || [])]
                                updatedCriteria[criterionIndex] = e.target.value
                                updateItem(section, index, { criteria: updatedCriteria })
                              }}
                              placeholder={`Criterion ${criterionIndex + 1}`}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updatedCriteria = (item.criteria || []).filter((_: string, i: number) => i !== criterionIndex)
                                updateItem(section, index, { criteria: updatedCriteria })
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedCriteria = [...(item.criteria || []), '']
                            updateItem(section, index, { criteria: updatedCriteria })
                          }}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Criterion
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem(section, { title: '', description: '', criteria: [] })}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add {section.slice(0, -1)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Sponsors Tab */}
        <TabsContent value="sponsors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Event Sponsors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.sponsors || []).map((sponsor: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Sponsor {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('sponsors', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={sponsor.name || ''}
                        onChange={(e) => updateItem('sponsors', index, { name: e.target.value })}
                        placeholder="Sponsor name"
                      />
                    </div>
                    <div>
                      <Label>Sponsor Type</Label>
                      <Input
                        value={sponsor.sponsorType || ''}
                        onChange={(e) => updateItem('sponsors', index, { sponsorType: e.target.value })}
                        placeholder="e.g., Gold, Silver, Bronze"
                      />
                    </div>
                    <div>
                      <Label>Website</Label>
                      <Input
                        value={sponsor.website || ''}
                        onChange={(e) => updateItem('sponsors', index, { website: e.target.value })}
                        placeholder="https://sponsor-website.com"
                      />
                    </div>
                    <div>
                      <Label>Logo URL</Label>
                      <Input
                        value={sponsor.image || ''}
                        onChange={(e) => updateItem('sponsors', index, { image: e.target.value })}
                        placeholder="Logo image URL"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('sponsors', { name: '', image: '', website: '', sponsorType: '' })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Sponsor
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help & FAQ Tab */}
        <TabsContent value="help" className="space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.instructions || []).map((instruction: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Instruction {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('instructions', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={instruction.title || ''}
                      onChange={(e) => updateItem('instructions', index, { title: e.target.value })}
                      placeholder="Instruction title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={instruction.description || ''}
                      onChange={(e) => updateItem('instructions', index, { description: e.target.value })}
                      placeholder="Detailed instructions"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Steps</Label>
                    <div className="space-y-2">
                      {(instruction.criteria || []).map((step: string, stepIndex: number) => (
                        <div key={stepIndex} className="flex gap-2">
                          <Input
                            value={step}
                            onChange={(e) => {
                              const updatedSteps = [...(instruction.criteria || [])]
                              updatedSteps[stepIndex] = e.target.value
                              updateItem('instructions', index, { criteria: updatedSteps })
                            }}
                            placeholder={`Step ${stepIndex + 1}`}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedSteps = (instruction.criteria || []).filter((_: string, i: number) => i !== stepIndex)
                              updateItem('instructions', index, { criteria: updatedSteps })
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updatedSteps = [...(instruction.criteria || []), '']
                          updateItem('instructions', index, { criteria: updatedSteps })
                        }}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Step
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('instructions', { title: '', description: '', criteria: [] })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Instruction
              </Button>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(formData.faqs || []).map((faq: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">FAQ {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem('faqs', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Question *</Label>
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => updateItem('faqs', index, { question: e.target.value })}
                      placeholder="Frequently asked question"
                    />
                  </div>
                  <div>
                    <Label>Answer *</Label>
                    <Textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateItem('faqs', index, { answer: e.target.value })}
                      placeholder="Answer to the question"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('faqs', { question: '', answer: '' })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Text */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Additional Information Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Hosts & Guests:</strong> Add key people to build credibility and attract participants</li>
          <li>• <strong>Prizes:</strong> Clear prize structure motivates participation in competitions</li>
          <li>• <strong>Requirements:</strong> Set clear expectations for participants</li>
          <li>• <strong>FAQs:</strong> Address common questions to reduce support queries</li>
          <li>• <strong>Sponsors:</strong> Acknowledge sponsors to maintain good relationships</li>
        </ul>
      </div>
    </div>
  )
}